import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AccountsService } from './accounts.service';
import { AccountArgs } from './dto/account.args';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';

@Resolver()
export class AccountsResolver {
  constructor(private readonly accountsService: AccountsService) {}

  @Mutation(() => AccountArgs)
  public register(@Args('registerInput') registerInput: RegisterInput) {
    // return this.authService.register(registerInput);
  }

  @Mutation(() => AccountArgs)
  public login(@Args('loginInput') loginInput: LoginInput) {
    // return this.authService.login(loginInput);
  }
}
