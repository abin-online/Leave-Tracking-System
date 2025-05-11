export interface LeaveType {
    _id: string;
    code: string;
    internalName: string;
    displayName: string;
    description: string;
    effectiveDate: Date;
    period: {
        start: string;
        end: string;
    };
    accrual: {
        type: 'unlimited' | 'timeBased' | 'frequencyBased';
        frequency?: 'monthly' | 'yearly' | 'quarterly';
        accrueAt?: 'start' | 'end';
        maxAccrual?: number;
        timeBased?: {
            employeeField: string;
            durationIn: 'days' | 'months' | 'years';
            value: number;
        };
    };
    carryForward: {
        enabled: boolean;
        max?: number;
    };
    proRated: boolean;
    includeNonWorkingDays: boolean;
    includePublicHolidays: boolean;
    allowModificationPostApplication: boolean;
    futureDated: boolean;
    minInSingleSpell?: number;
    maxInSingleSpell?: number;
    maxNegativeBalance: number;
    active: boolean;
}