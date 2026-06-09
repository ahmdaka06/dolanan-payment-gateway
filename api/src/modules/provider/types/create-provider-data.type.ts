import { ProviderCode } from '../../../common/enums/provider-code.enum';

export type CreateProviderData = {
    code: ProviderCode;
    name: string;
}
