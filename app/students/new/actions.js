"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import pool from "../../lib/database";

const provinces = new Set([
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
]);

const postalCodePattern =
  /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z] ?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getText(formData, name) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function createStudent(_previousState, formData) {
  const firstName = getText(formData, "firstName");
  const lastName = getText(formData, "lastName");
  const email = getText(formData, "email").toLowerCase();
  const program = getText(formData, "program");
  const yearOfStudy = getText(formData, "year");
  const phone = getText(formData, "phone");
  const streetAddress = getText(formData, "streetAddress");
  const city = getText(formData, "city");
  const province = getText(formData, "province");
  const postalCode = getText(formData, "postalCode").toUpperCase();

  if (firstName.length < 2 || firstName.length > 30) {
    return { error: "Enter a first name between 2 and 30 characters." };
  }
  if (lastName.length < 2 || lastName.length > 30) {
    return { error: "Enter a last name between 2 and 30 characters." };
  }
  if (email.length > 254 || !emailPattern.test(email)) {
    return { error: "Enter a valid email address." };
  }
  if (program.length === 0 || program.length > 30) {
    return { error: "Enter a program name of up to 30 characters." };
  }
  if (!["1", "2", "3", "4", "5", "6"].includes(yearOfStudy)) {
    return { error: "Select a valid year of study." };
  }
  if (phone.length > 30) {
    return { error: "Enter a phone number of up to 30 characters." };
  }
  if (streetAddress.length === 0 || streetAddress.length > 255) {
    return { error: "Enter a street address of up to 255 characters." };
  }
  if (city.length === 0 || city.length > 30) {
    return { error: "Enter a city of up to 30 characters." };
  }
  if (!provinces.has(province)) {
    return { error: "Select a valid province or territory." };
  }
  if (!postalCodePattern.test(postalCode)) {
    return { error: "Enter a valid Canadian postal code." };
  }

  try {
    await pool.execute(
      `INSERT INTO students
        (first_name, last_name, email, phone, street_address, city,
         province_state, country, postal_code, program, year)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        firstName,
        lastName,
        email,
        phone || null,
        streetAddress,
        city,
        province,
        "Canada",
        postalCode,
        program,
        `Y${yearOfStudy}`,
      ],
    );
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return { error: "A student with this email address already exists." };
    }
    throw error;
  }

  revalidatePath("/");
  revalidatePath("/students");
  redirect("/");
}
