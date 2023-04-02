import { IsDefined } from "class-validator";

export class createProfileDto {
  @IsDefined()
  readonly id: number;

  readonly firstName: string;

  readonly lastName: string;

  readonly phone: string;

  readonly birthday: string;

  readonly isAdmin: boolean;
}
