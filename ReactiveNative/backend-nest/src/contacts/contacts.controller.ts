import { Controller,Query, Post, Get, Body, Param, Put, Delete } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Contact } from './contact.entity';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post('add')
  async addContact(
    @Body() body: { fname: string; lname: string; email: string; phone: string },
  ) {
    return this.contactsService.createContact(body);
  }

  @Get('all')
  async getAllContacts() {
    return this.contactsService.getAllContacts();
  }

  @Get('search')
  async searchContacts(@Query('query') query: string) {
    return this.contactsService.searchContacts(query);
  }
  

  @Put('update/:id')
  async updateContact(@Param('id') id: string, @Body() body: Partial<Contact>) {
    const contactId = Number(id);
    if (isNaN(contactId)) {
      throw new Error('Invalid ID provided for update');
    }
    return this.contactsService.updateContact(contactId, body);
  }
  

@Delete('delete/:id')
async deleteContact(@Param('id') id: string) {
  const contactId = Number(id);
  if (isNaN(contactId)) {
    throw new Error('Invalid ID provided for deletion');
  }
  return this.contactsService.deleteContact(contactId);
}

}