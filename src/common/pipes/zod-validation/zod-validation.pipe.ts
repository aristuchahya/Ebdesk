import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly zodSchema: ZodSchema) {}
  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      const parsed = await this.zodSchema.parseAsync(value);
      return parsed;
    } catch (err) {
      throw new UnprocessableEntityException(
        'Failed to validate the request ' + metadata.type,
        { cause: err },
      );
    }
  }
}
