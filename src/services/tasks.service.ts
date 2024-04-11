import { prisma } from "../database/prisma";

export class TasksServices {
  getTasks = async () => {
    return await prisma.task.findMany();
  };

  addTask = async(newTask:Itask) =>{
    return await prisma.task.create({data:{ title:

    }})
  }

}
// model Task{
//     id Int @id @default(autoincrement())
//     title String
//     content String
//     finished Boolean @default(false)
//     categoryId Int? 
//     category Category? @relation(fields: [categoryId], references: [id], onDelete: SetNull)
//   }