import { registerEnumType } from '@nestjs/graphql';

export enum DonationScalarFieldEnum {
    id = "id",
    count = "count",
    displayName = "displayName",
    email = "email",
    team = "team",
    message = "message",
    mobile = "mobile",
    isAnonymous = "isAnonymous",
    createdAt = "createdAt"
}


registerEnumType(DonationScalarFieldEnum, { name: 'DonationScalarFieldEnum', description: undefined })
