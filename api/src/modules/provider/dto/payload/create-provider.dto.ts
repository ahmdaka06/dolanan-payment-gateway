import { IsEnum, IsString } from 'class-validator';
import { ProviderCode } from '../../../../common/enums/provider-code.enum';

export class CreateProviderDto {
    @IsEnum(ProviderCode)
    code: ProviderCode;

    @IsString()
    name: string;
}
