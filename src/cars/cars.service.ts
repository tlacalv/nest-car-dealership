import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Accord',
    },
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
  ];
  findAll() {
    return this.cars;
  }
  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`no hay na pal id ${id}`);
    return car;
  }
  create(createCarDto: CreateCarDto) {
    const car: Car = {
      id: uuid(),
      ...createCarDto,
    };
    this.cars.push(car);
    return car;
  }
  update(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findOneById(id);

    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException(`Car id is not valid inside body`);

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = {
          model: updateCarDto.model ?? carDB.model,
          brand: updateCarDto.brand ?? carDB.brand,
          id,
        };
        return carDB;
      }
      return car;
    });
    return carDB;
  }

  delete(id: string) {
    const cartDB = this.findOneById(id);
    if (!cartDB) {
      throw new BadRequestException(`No car with ${id} id.`);
    }
    this.cars = this.cars.filter((car) => car.id !== id);
  }
}
