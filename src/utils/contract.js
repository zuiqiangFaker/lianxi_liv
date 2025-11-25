import { ethers } from 'ethers';
export class ContractService {
    NFTABI = [
        'function setApprovalForAll(address operator, bool approved) external',
        'function isApprovedForAll(address owner, address operator) external view returns (bool)',
        'function ownerOf(uint256 tokenId) external view returns (address owner)'
    ];
    LOANABI = [
        'function lock(uint[] memory tokenIds) external',
        'function share(uint[] memory tokenIds,address borrower,uint256 duration) external',
        'function lend((uint256 tokenId,uint256 minDuration,uint256 maxDuration,uint256 dailyAmount)[] orders) external',
        'function reject(uint[] memory tokenIds) external',
        'function accept(uint[] calldata tokenIds) external',
        'function borrow((uint256 tokenId,uint256 duration)[] orders) external',
        'function stopShare(uint[] calldata tokenIds) external',
        'function unshare(uint[] calldata tokenIds) external',
        'function cancelLend(uint[] calldata tokenIds) external',
        'function unlock(uint[] calldata tokenIds) external'
    ];
    ERC20ABI = [
        'function approve(address spender, uint256 value) external returns (bool)',
        'function allowance(address owner, address spender) external view returns (uint256)',
        'function balanceOf(address account) external view returns (uint256)'
    ];
    cof = {
        sepolia: {
            illuvials: '0xd2ea0c12E769A7B40728360274B0Ec9A66E29f6C',
            loan: '0x068D24563c8a6B95641DC89bfCD269C717Cf5a6D',
            voucher: '0x864cfEAf32D1812c32C61A83882B20EB43008078',
            usdt: {
                address: '0x2fB06B41e72a468616b626f0fC58E484325F770d',
                decimals: 6
            },
            chainData: {
                chainId: '0x14A34',
                chainName: 'Base Sepolia Testnet',
                nativeCurrency: {
                    name: 'Ethereum',
                    symbol: 'ETH',
                    decimals: 18
                },
                rpcUrls: ['https://sepolia.base.org'],
                blockExplorerUrls: ['https://sepolia.basescan.org/']
            }
        },
        mainnet: {
            illuvials: '0xd2ea0c12E769A7B40728360274B0Ec9A66E29f6C',
            loan: '0x068D24563c8a6B95641DC89bfCD269C717Cf5a6D',
            voucher: '0x864cfEAf32D1812c32C61A83882B20EB43008078',
            usdt: {
                address: '0x2fB06B41e72a468616b626f0fC58E484325F770d',
                decimals: 6
            },
            chainData: {
                chainId: '0x14A34',
                chainName: 'Base Sepolia Testnet',
                nativeCurrency: {
                    name: 'Ethereum',
                    symbol: 'ETH',
                    decimals: 18
                },
                rpcUrls: ['https://sepolia.base.org'],
                blockExplorerUrls: ['https://sepolia.basescan.org/']
            }
        }
    };
    constructor(environment) {
        if (!window.ethereum) {
            throw new Error('Please install MetaMask');
        }
        this.config = this.cof[environment];
        this.provider = new ethers.JsonRpcProvider(this.config.chainData.rpcUrls[0]);
        this.environment = environment;
    }
    async init() {
        // 请求账户授权（如果已经授权过，MetaMask不会再次弹窗）
        if (!window.ethereum) {
            throw new Error('MetaMask is not available. Please install or enable it.');
        }
        try {
            // 请求账户授权
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            // 获取当前链 ID
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            if (chainId !== this.config.chainData.chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: this.config.chainData.chainId }]
                    });
                } catch (switchError) {
                    if (switchError.code === 4902) {
                        // 网络未添加，尝试添加网络
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [this.config.chainData]
                        });
                    } else {
                        throw switchError;
                    }
                }
            }
            this.ethereum = window.ethereum;
            this.provider = new ethers.BrowserProvider(this.ethereum);
            this.signer = await this.provider.getSigner();
            return accounts[0];
        } catch (error) {
            throw error;
        }
    }
    /**
     * 授权
     * @param {*} isApproval
     * @returns
     */
    async setApprovalForAll(isApproval) {
        await this.init();
        const tokenContract = new ethers.Contract(this.config.illuvials, this.NFTABI, this.signer);
        let loan = this.config.loan;
        const tx = await tokenContract.setApprovalForAll(loan, isApproval);
        return await tx.wait();
    }

    /**
     *是否授权
     * @param {*} address //当前登录地址
     * @returns
     */
    async isApprovalForAll(address) {
        const tokenContract = new ethers.Contract(
            this.config.illuvials,
            this.NFTABI,
            this.provider
        );
        let loan = this.config.loan;
        return await tokenContract.isApprovedForAll(address, loan);
    }

    /**
     * 质押
     * @param {Array} tokenIds
     * @returns
     */
    async lock(tokenIds) {
        await this.init();
        const tokenContract = new ethers.Contract(this.config.loan, this.LOANABI, this.signer);
        const tx = await tokenContract.lock(tokenIds);
        return await tx.wait();
    }

    /**
     * 分享
     * @param {Array} tokenIds
     * @param {String} borrower //借的人地址
     * @param {Number} duration //时长
     * @returns
     */
    async share(tokenIds, borrower, duration) {
        await this.init();
        const tokenContract = new ethers.Contract(this.config.loan, this.LOANABI, this.signer);
        return await tokenContract.share(tokenIds, borrower, duration);
    }

    /**
     * 同意
     * @param {Array} tokenIds
     * @returns
     */
    async accept(tokenIds) {
        await this.init();
        const tokenContract = new ethers.Contract(this.config.loan, this.LOANABI, this.signer);
        return await tokenContract.accept(tokenIds);
    }

    /**
     * 拒绝
     * @param {Array} tokenIds
     * @returns
     */
    async reject(tokenIds) {
        await this.init();
        const tokenContract = new ethers.Contract(this.config.loan, this.LOANABI, this.signer);
        const tx = await tokenContract.reject(tokenIds);
        return await tx.wait();
    }

    /**
     * 终止分享(已经分享出去)
     * @param {Array} tokenIds
     * @returns
     */
    async stopShare(tokenIds) {
        await this.init();
        const tokenContract = new ethers.Contract(this.config.loan, this.LOANABI, this.signer);
        const tx = await tokenContract.stopShare(tokenIds);
        return await tx.wait();
    }

    /**
     * 取消分享
     * @param {Array} tokenIds
     * @returns
     */
    // async unshare(tokenIds) {
    //     await this.init();
    //     const tokenContract = new ethers.Contract(this.config.loan, this.LOANABI, this.signer);
    //     const tx = await tokenContract.unshare(tokenIds);
    //     return await tx.wait();
    // }

    /**
     * 借出挂单
     * @param {Array} orders [{tokenId:1,minDuration:86400,maxDuration:86400,dailyAmount:1}]
     * @returns
     */
    async lend(orders) {
        await this.init();
        const tokenContract = new ethers.Contract(this.config.loan, this.LOANABI, this.signer);
        const decimals = this.config.usdt.decimals;
        let replace_orders = [];
        orders.forEach(item => {
            let dailyAmount = ethers.parseUnits(String(item.dailyAmount), decimals).toString();
            replace_orders = [
                ...replace_orders,
                [item.tokenId, item.minDuration, item.maxDuration, dailyAmount]
            ];
        });
        const tx = await tokenContract.lend(replace_orders);
        return await tx.wait();
    }

    /**
     * 借入
     * @param {Array} orders [{tokenId:1,duration:86400}]
     * @returns
     */
    async borrow(orders) {
        await this.init();
        const tokenContract = new ethers.Contract(this.config.loan, this.LOANABI, this.signer);
        let replace_orders = [];
        orders.forEach(item => {
            replace_orders = [...replace_orders, [item.tokenId, item.duration]];
        });
        const tx = await tokenContract.borrow(replace_orders);
        return await tx.wait();
    }

    /**
     * 取消借出挂单
     * @param {Array} tokenIds
     * @returns
     */
    async cancelLend(tokenIds) {
        await this.init();
        const tokenContract = new ethers.Contract(this.config.loan, this.LOANABI, this.signer);
        const tx = await tokenContract.cancelLend(tokenIds);
        return await tx.wait();
    }

    /**
     * 取消质押
     * @param {Array} tokenIds
     * @returns
     */
    async unlock(tokenIds) {
        await this.init();
        const tokenContract = new ethers.Contract(this.config.loan, this.LOANABI, this.signer);
        const tx = await tokenContract.unlock(tokenIds);
        return await tx.wait();
    }

    /**
     * 租金授权
     * @returns
     */
    async approve() {
        await this.init();
        const tokenContract = new ethers.Contract(
            this.config.usdt.address,
            this.ERC20ABI,
            this.signer
        );
        const decimals = this.config.usdt.decimals;
        const tx = await tokenContract.approve(
            this.config.loan,
            ethers.parseUnits('999999999', decimals).toString()
        );
        return await tx.wait();
    }

    /**
     * 授权金额
     * @param {*} address
     * @returns
     */
    async allowance(address) {
        await this.init();
        const tokenContract = new ethers.Contract(
            this.config.usdt.address,
            this.ERC20ABI,
            this.signer
        );
        const decimals = this.config.usdt.decimals;
        const amount = await tokenContract.allowance(address, this.config.loan);
        return ethers.formatUnits(amount, decimals);
    }

    /**
     * 查询余额
     * @param {string} address - 要查询的账户地址
     * @returns {string} 格式化后的余额
     */
    async balanceOf(address) {
        await this.init();
        const tokenContract = new ethers.Contract(
            this.config.usdt.address,
            this.ERC20ABI,
            this.signer
        );
        const decimals = this.config.usdt.decimals;
        const balance = await tokenContract.balanceOf(address);
        return ethers.formatUnits(balance, decimals);
    }
    /**
     * 签名
     * @param {*} message
     * @param {*} account
     */
    async personalSign(message, account) {
        await this.init();
        return await this.ethereum.request({
            method: 'personal_sign',
            params: [message, account]
        });
    }

    /**
     *
     * @param {Number} tokenId
     * @returns
     */
    async ownerOf(tokenId) {
        const tokenContract = new ethers.Contract(
            this.config.illuvials,
            this.NFTABI,
            this.provider
        );
        return await tokenContract.ownerOf(tokenId);
    }
    /**
     * 获取当前钱包连接的地址
     * @returns {string|null} 当前地址或 null
     */
    async getCurrentAddress() {
        if (!window.ethereum) return null;
        // const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
        return accounts && accounts.length ? accounts[0] : null;
    }
    /**
     * 检查当前钱包地址是否与登录地址一致
     * @param {string} expectedAddress - 登录时保存的用户地址
     * @returns {boolean} - 是否一致
     */
    async checkAddress(expectedAddress) {
    const current = await this.getCurrentAddress();
    if (!current) {
        // ElMessage.warning('Please connect your wallet first');
        return false;
    }

    if (current.toLowerCase() !== expectedAddress.toLowerCase()) {
        // ElMessage.warning('Wallet address mismatch, please switch back to your login address');
        return false;
    }
    return true;
    }

}
