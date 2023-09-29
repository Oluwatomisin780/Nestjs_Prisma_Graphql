import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DonationsService } from './donations.service';
//import { CreateDonationInput } from './dto/create-donation.input';
import { PubSub } from 'graphql-subscriptions';
import { UpdateDonationInput } from './dto/update-donation.input';
import { OrderByParams } from 'src/graphql';
import { DonationCreateInput } from 'src/@generated/prisma-nestjs-graphql/donation/donation-create.input';

const pubSub = new PubSub();
@Resolver('Donation')
export class DonationsResolver {
  constructor(private readonly donationsService: DonationsService) {}

  @Mutation('createDonation')
  async create(
    @Args('createDonationInput')
    createDonationInput: DonationCreateInput,
  ) {
    const createDonation =
      await this.donationsService.create(createDonationInput);
    const total = await this.donationsService.getDonations();
    pubSub.publish('totalUpdated', { totalUpdated: total });
    return createDonation;
  }

  @Query('donations')
  findAll(@Args('orderBy') orderBy?: OrderByParams) {
    return this.donationsService.findAll(orderBy);
  }

  @Query('donation')
  findOne(@Args('id') id: number) {
    return this.donationsService.findOne(id);
  }

  @Mutation('updateDonation')
  update(
    @Args('updateDonationInput') updateDonationInput: UpdateDonationInput,
  ) {
    return this.donationsService.update(
      updateDonationInput.id,
      updateDonationInput,
    );
  }

  @Mutation('removeDonation')
  remove(@Args('id') id: number) {
    return this.donationsService.remove(id);
  }
  @Query('totalDonations')
  findAllDonations() {
    return this.donationsService.getDonations();
  }
}
