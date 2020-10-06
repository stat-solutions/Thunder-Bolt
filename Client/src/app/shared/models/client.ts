export interface Client {
    personalInfo: {
        id: number;
        name: string;
        phone1: number;
        phone2: number;
        address: string;
        idType: string;
        idNo: any;
        secretePIN: number;
        photoUrl: string;
        clientComment: string;
        products: Array<string>;
    };
    businnessInfo: {
        microClient: {
            guarantor1: string;
            guarantor2: string;
            guarantor3: string;
            security1Name: string;
            security1Location: string;
            security1Photo: string;
            security2Name: string;
            security2Location: string;
            security2Photo: string;
        };
        bodaClient: {
            plateNo: any;
            bodaColor: string;
            model: string;
            yrOfManufacture: any;
            engineNumber: any;
            photos: Array<string>;
        };
        taxiClient: {
            plateNo: any;
            taxiColor: string;
            model: string;
            yrOfManufacture: any;
            engineNumber: any;
            photos: Array<string>;
        };
    };
    transactionsInfo: {
        loan: {
            loanLimit: number;
            loanBalance: number;
            latestInterest: number;
            latestPrincipal: number;
            interestRate: number;
            latestLoans: Array<number>;
        };
        savings: {
            savingBalance: number;
            laatestSavings: Array<number>;
        }
    };
    officerComment: string;
}
