import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Contact } from './contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  async createContact(data: { fname: string; lname: string; email: string; phone: string }): Promise<Contact> {
    const newContact = this.contactRepository.create(data);
    return this.contactRepository.save(newContact);
  }

  async getAllContacts(): Promise<Contact[]> {
    const contacts = await this.contactRepository.find();
    console.log('Fetched Contacts:', contacts); // Debugging
    return contacts;
  }

  async searchContacts(query: string): Promise<Contact[]> {
    return this.contactRepository.find({
        where: [
            { fname: Like(`%${query}%`) },
            { lname: Like(`%${query}%`) },
            { phone: Like(`%${query}%`) },
        ],
    });
}


  async updateContact(id: number, data: Partial<Contact>): Promise<Contact> {
    const contact = await this.contactRepository.findOne({ where: { id } });
    if (!contact) {
      throw new Error(`Contact with ID ${id} not found`);
    }
    Object.assign(contact, data); // Merge new data into the existing contact
    return this.contactRepository.save(contact); // Save and return updated contact
  }
  
  

  async deleteContact(id: number): Promise<void> {
    await this.contactRepository.delete(id);
  }
}
