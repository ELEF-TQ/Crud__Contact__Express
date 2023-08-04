const Contact = require('../models/contactModel');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const getContacts = asyncHandler(async (req, res) => {
  const userId = req.user._id; 
  const contacts = await Contact.find({ user_id: userId });
  res.status(200).json({ contacts });
});

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const userId = req.user._id;
  if (!contact.user_id.equals(userId)) {
    res.status(403);
    throw new Error("Forbidden - Contact does not belong to the authenticated user");
  }

  res.status(200).json({ contact });
});

const addContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are required");
  }

 
  const userId = req.user._id;
  const contact = await Contact.create({ name, email, phone, user_id: userId });

  res.status(201).json({ contact });
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const userId = req.user._id;
  if (!contact.user_id.equals(userId)) {
    res.status(403);
    throw new Error("Forbidden - Contact does not belong to the authenticated user");
  }

  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({ updateContact });
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }


  const userId = req.user._id;
  if (!contact.user_id.equals(userId)) {
    res.status(403);
    throw new Error("Forbidden - Contact does not belong to the authenticated user");
  }

  await contact.deleteOne();
  res.status(200).json({ deletedContact: contact });
});

module.exports = { getContacts, getContact, addContact, deleteContact, updateContact };
