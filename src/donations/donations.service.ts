import { Injectable } from '@nestjs/common';
//import { CreateDonationInput } from './dto/create-donation.input';
import { UpdateDonationInput } from './dto/update-donation.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { OrderByParams } from 'src/graphql';

@Injectable()
export class DonationsService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createDonationInput: Prisma.DonationCreateInput) {
    return this.prismaService.donation.create({
      data: {
        ...createDonationInput,
      },
    });
  }

  findAll(orderBy?: OrderByParams) {
    const { field = 'createdAt', direction = 'desc' } = orderBy || {};
    return this.prismaService.donation.findMany({
      orderBy: { [field]: direction },
    });
  }

  findOne(id: number) {
    return this.prismaService.donation.findUnique({ where: { id } });
  }

  update(id: number, updateDonationInput: UpdateDonationInput) {
    return `This action updates a #${id} donation`;
  }

  remove(id: number) {
    return `This action removes a #${id} donation`;
  }

  async getDonations() {
    const response = await this.prismaService.donation.aggregate({
      _sum: {
        count: true,
      },
    });
    return response._sum.count;
  }
}
