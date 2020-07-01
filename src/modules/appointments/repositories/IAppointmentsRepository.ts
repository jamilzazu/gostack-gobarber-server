import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import ICreateAppoitmentDTO from '@modules/appointments/dtos/ICreateAppoitmentDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppoitmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
