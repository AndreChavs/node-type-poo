import { Column, Entity, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { RoleType } from "../dto/user.dto";

@Entity({name:"user"})
export class UserEntity extends BaseEntity{
  @Column()
  name!: string;

  @Column()
  lastname!: string;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({nullable: true})
  city!: string;

  @Column()
  province!: number;

  @Column({type:"enum", enum: RoleType, nullable: false})
  role!: RoleType;

  @OneToOne(() => CustomerEntity, (custumer) => custumer.user)
  custumer!: CustomerEntity;
}

