
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }


// ===============================================================

private static getHoroscope(birthdate: Date): string {
  const day = birthdate.getDate();
  const month = birthdate.getMonth() + 1;

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return 'Aries';
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return 'Taurus';
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return 'Gemini';
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return 'Cancer';
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return 'Leo';
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return 'Virgo';
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return 'Libra';
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return 'Scorpio';
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return 'Sagittarius';
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return 'Capricorn';
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return 'Aquarius';
  } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
    return 'Pisces';
  }

  return 'Horoscope tidak tersedia.';
}

private static getZodiac(birthdate: Date): string {
  const startYear = 1900;
  const year = birthdate.getFullYear();
  const chineseZodiacs =['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
  const index = (year - startYear) % chineseZodiacs.length;
  return chineseZodiacs[index];
}

async create(createUserDto: CreateUserDto): Promise<User> {
  const { password,birthdate, ...rest } = createUserDto;

  const birthdateObj = new Date(birthdate);

  const horoscope = UserService.getHoroscope(birthdateObj);
  const zodiac = UserService.getZodiac(birthdateObj);
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = new this.userModel({
    ...rest,
    birthdate: birthdateObj,
    horoscope,
    zodiac,
    password: hashedPassword, 
    chats: [], 
  });

  return createdUser.save();

  
}
async createProfile(createUserDto: CreateUserDto): Promise<User> {
  return this.create(createUserDto);
}


  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (updateUserDto.username) {
      user.username = updateUserDto.username;
    }

    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }

    if (updateUserDto.birthdate) {
      const birthdateObj = new Date(updateUserDto.birthdate);
      user.birthdate = birthdateObj;
      user.horoscope = UserService.getHoroscope(birthdateObj);
      user.zodiac = UserService.getZodiac(birthdateObj);
    }
    return user.save();
  }

  async findUserWithChats(userId: string): Promise<User | null> {
    return this.userModel
      .findById(userId)
     
      .populate({
        path: 'chats',
        model: 'Chat',  
      })
      .exec();
  }
  async remove(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not foundss`);
    }
    await this.userModel.findByIdAndDelete(id).exec();
    return user;
  }
}
