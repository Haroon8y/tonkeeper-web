// eslint-disable-next-line max-classes-per-file
import { AuthKeychain, AuthPassword, AuthSigner, AuthSignerDeepLink } from './password';
import { KeystonePathInfo } from '../service/keystone/types';
import { DerivationItem, TonWalletStandard, WalletId } from './wallet';

/**
 * @deprecated
 */
export interface DeprecatedAccountState {
    publicKeys: string[];
    activePublicKey?: string;
}

export type AccountId = string;

export interface IAccount {
    name: string;
    emoji: string;

    get allTonWallets(): TonWalletStandard[];
    get activeDerivationTonWallets(): TonWalletStandard[];
    get activeTonWallet(): TonWalletStandard;

    getTonWallet(id: WalletId): TonWalletStandard | undefined;
    updateTonWallet(wallet: TonWalletStandard): void;
    addTonWalletToActiveDerivation(wallet: TonWalletStandard): void;
    removeTonWalletFromActiveDerivation(walletId: WalletId): void;
    setActiveTonWallet(walletId: WalletId): void;
}

export class Clonable {
    clone() {
        const cloned = structuredClone(this);
        Object.setPrototypeOf(cloned, Object.getPrototypeOf(this));
        return cloned as this;
    }
}

export class AccountTonMnemonic extends Clonable implements IAccount {
    public readonly type = 'mnemonic';

    get allTonWallets() {
        return this.tonWallets;
    }

    get activeDerivationTonWallets() {
        return this.tonWallets;
    }

    get activeTonWallet() {
        return this.tonWallets.find(w => w.id === this.activeTonWalletId)!;
    }

    constructor(
        public readonly id: AccountId,
        public name: string,
        public emoji: string,
        public auth: AuthPassword | AuthKeychain,
        public activeTonWalletId: WalletId,
        public tonWallets: TonWalletStandard[]
    ) {
        super();
    }

    getTonWallet(id: WalletId) {
        return this.allTonWallets.find(w => w.id === id);
    }

    updateTonWallet(wallet: TonWalletStandard) {
        const index = this.tonWallets.findIndex(w => w.id === wallet.id)!;
        if (index === -1) {
            throw new Error('Wallet not found');
        }
        this.tonWallets[index] = wallet;
    }

    addTonWalletToActiveDerivation(wallet: TonWalletStandard) {
        this.tonWallets.push(wallet);
    }

    removeTonWalletFromActiveDerivation(walletId: WalletId) {
        if (this.tonWallets.length === 1) {
            throw new Error('Cannot remove last wallet');
        }

        this.tonWallets = this.tonWallets.filter(w => w.id !== walletId);
        if (this.activeTonWalletId === walletId) {
            this.activeTonWalletId = this.tonWallets[0].id;
        }
    }

    setActiveTonWallet(walletId: WalletId) {
        this.activeTonWalletId = walletId;
    }
}

export class AccountLedger extends Clonable implements IAccount {
    public readonly type = 'ledger';

    get allTonWallets() {
        return this.derivations.flatMap(d => d.tonWallets);
    }

    get activeDerivationTonWallets() {
        return this.activeDerivation.tonWallets;
    }

    get activeDerivation() {
        return this.derivations.find(d => this.activeDerivationIndex === d.index)!;
    }

    get activeTonWallet() {
        const activeDerivation = this.activeDerivation;
        return this.activeDerivationTonWallets.find(
            w => w.id === activeDerivation.activeTonWalletId
        )!;
    }

    constructor(
        public readonly id: AccountId,
        public name: string,
        public emoji: string,
        public activeDerivationIndex: number,
        public readonly derivations: DerivationItem[]
    ) {
        super();
    }

    getTonWallet(id: WalletId) {
        return this.allTonWallets.find(w => w.id === id);
    }

    updateTonWallet(wallet: TonWalletStandard) {
        for (const derivation of this.derivations) {
            const index = derivation.tonWallets.findIndex(w => w.id === wallet.id);
            if (index !== -1) {
                derivation.tonWallets[index] = wallet;
                return;
            }
        }

        throw new Error('Derivation not found');
    }

    addTonWalletToActiveDerivation(wallet: TonWalletStandard) {
        this.activeDerivation.tonWallets.push(wallet);
    }

    removeTonWalletFromActiveDerivation(walletId: WalletId) {
        if (this.activeDerivation.tonWallets.length === 1) {
            throw new Error('Cannot remove last wallet');
        }

        this.activeDerivation.tonWallets = this.activeDerivation.tonWallets.filter(
            w => w.id !== walletId
        );
        if (this.activeDerivation.activeTonWalletId === walletId) {
            this.activeDerivation.activeTonWalletId = this.activeDerivation.tonWallets[0].id;
        }
    }

    setActiveTonWallet(walletId: WalletId) {
        for (const derivation of this.derivations) {
            const index = derivation.tonWallets.findIndex(w => w.id === walletId);
            if (index !== -1) {
                derivation.activeTonWalletId = walletId;
                this.activeDerivationIndex = derivation.index;
                return;
            }
        }

        throw new Error('Derivation not found');
    }
}

export class AccountKeystone extends Clonable implements IAccount {
    public readonly type = 'keystone';

    get allTonWallets() {
        return [this.tonWallet];
    }

    get activeDerivationTonWallets() {
        return [this.tonWallet];
    }

    get activeTonWallet() {
        return this.tonWallet;
    }

    constructor(
        public readonly id: AccountId,
        public name: string,
        public emoji: string,
        public readonly pathInfo: KeystonePathInfo | undefined,
        public tonWallet: TonWalletStandard
    ) {
        super();
    }

    getTonWallet(id: WalletId) {
        return this.allTonWallets.find(w => w.id === id);
    }

    updateTonWallet(wallet: TonWalletStandard) {
        this.tonWallet = wallet;
    }

    addTonWalletToActiveDerivation() {
        throw new Error('Cannot add ton wallet to keystone account');
    }

    removeTonWalletFromActiveDerivation() {
        throw new Error('Cannot remove ton wallet from keystone account');
    }

    setActiveTonWallet(walletId: WalletId) {
        if (walletId !== this.tonWallet.id) {
            throw new Error('Cannot add ton wallet to keystone account');
        }
    }
}

export class AccountTonOnly extends Clonable implements IAccount {
    public readonly type = 'ton-only';

    get allTonWallets() {
        return this.tonWallets;
    }

    get activeDerivationTonWallets() {
        return this.tonWallets;
    }

    get activeTonWallet() {
        return this.tonWallets.find(w => w.id === this.activeTonWalletId)!;
    }

    constructor(
        public readonly id: AccountId,
        public name: string,
        public emoji: string,
        public readonly auth: AuthSigner | AuthSignerDeepLink,
        public activeTonWalletId: WalletId,
        public tonWallets: TonWalletStandard[]
    ) {
        super();
    }

    getTonWallet(id: WalletId) {
        return this.allTonWallets.find(w => w.id === id);
    }

    updateTonWallet(wallet: TonWalletStandard) {
        const index = this.tonWallets.findIndex(w => w.id === wallet.id)!;
        if (index === -1) {
            throw new Error('Wallet not found');
        }
        this.tonWallets[index] = wallet;
    }

    addTonWalletToActiveDerivation(wallet: TonWalletStandard) {
        this.tonWallets.push(wallet);
    }

    removeTonWalletFromActiveDerivation(walletId: WalletId) {
        if (this.tonWallets.length === 1) {
            throw new Error('Cannot remove last wallet');
        }

        this.tonWallets = this.tonWallets.filter(w => w.id !== walletId);
        if (this.activeTonWalletId === walletId) {
            this.activeTonWalletId = this.tonWallets[0].id;
        }
    }

    setActiveTonWallet(walletId: WalletId) {
        this.activeTonWalletId = walletId;
    }
}

export type Account = AccountTonMnemonic | AccountLedger | AccountKeystone | AccountTonOnly;

export type AccountsState = Account[];

export const defaultAccountState: AccountsState = [];

export function serializeAccount(account: Account): string {
    return JSON.stringify(account);
}

const prototypes = {
    mnemonic: AccountTonMnemonic.prototype,
    ledger: AccountLedger.prototype,
    keystone: AccountKeystone.prototype,
    'ton-only': AccountTonOnly.prototype
} as const;

export function bindAccountToClass(accountStruct: Account): void {
    Object.setPrototypeOf(accountStruct, prototypes[accountStruct.type]);
}

export function getWalletById(
    accounts: Account[],
    walletId: WalletId
): TonWalletStandard | undefined {
    for (const account of accounts || []) {
        const wallet = account.getTonWallet(walletId);
        if (wallet) {
            return wallet;
        }
    }
}
