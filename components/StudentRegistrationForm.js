"use client";

import { useActionState, useEffect, useState } from "react";
import { createStudent } from "../app/students/new/actions";

const inputClassName =
  "mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20";

const provinces = [
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
];

function Field({ label, name, required = true, children }) {
  return (
    <label className="block text-sm font-medium text-slate-700" htmlFor={name}>
      {label}
      {required ? <span aria-hidden="true"> *</span> : null}
      {children}
    </label>
  );
}

export default function StudentRegistrationForm() {
  const [formState, formAction, isPending] = useActionState(createStudent, {
    error: "",
  });
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [weatherStatus, setWeatherStatus] = useState("idle");
  const [weatherError, setWeatherError] = useState("");

  function handleCityChange(event) {
    const value = event.target.value;
    setCity(value);
    setWeather(null);
    setWeatherError("");
    setWeatherStatus(value.trim().length >= 2 ? "loading" : "idle");
  }

  useEffect(() => {
    const cityQuery = city.trim();
    if (cityQuery.length < 2) {
      return undefined;
    }

    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/weather?city=${encodeURIComponent(cityQuery)}`,
          { signal: controller.signal },
        );
        const data = await response.json();
        if (controller.signal.aborted) {
          return;
        }

        if (!response.ok) {
          throw new Error(data.error || "Unable to load the current weather.");
        }

        setWeather(data);
        setWeatherStatus("success");
      } catch (error) {
        if (controller.signal.aborted || error.name === "AbortError") {
          return;
        }

        setWeatherError(error.message || "Unable to load the current weather.");
        setWeatherStatus("error");
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [city]);

  return (
    <form
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
      action={formAction}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First Name" name="firstName">
          <input
            className={inputClassName}
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            minLength={2}
            maxLength={50}
            pattern=".*\S.*"
            title="Enter a first name with at least 2 characters."
            required
          />
        </Field>

        <Field label="Last Name" name="lastName">
          <input
            className={inputClassName}
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            minLength={2}
            maxLength={50}
            pattern=".*\S.*"
            title="Enter a last name with at least 2 characters."
            required
          />
        </Field>

        <Field label="Email" name="email">
          <input
            className={inputClassName}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            autoCapitalize="none"
            spellCheck="false"
            title="Enter a valid email address, such as name@example.com."
            required
          />
        </Field>

        <Field label="Program" name="program">
          <input
            className={inputClassName}
            id="program"
            name="program"
            type="text"
            autoComplete="organization-title"
            maxLength={100}
            pattern=".*\S.*"
            title="Enter a program name."
            required
          />
        </Field>

        <Field label="Year" name="year">
          <select
            className={inputClassName}
            id="year"
            name="year"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select year of study
            </option>
            {[1, 2, 3, 4, 5, 6].map((year) => (
              <option key={year} value={year}>
                {year}
                {year === 1 ? "st" : year === 2 ? "nd" : year === 3 ? "rd" : "th"}{" "}
                year
              </option>
            ))}
          </select>
        </Field>

        <Field label="Phone Number" name="phone" required={false}>
          <input
            className={inputClassName}
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={30}
          />
        </Field>

        <Field label="Street Address" name="streetAddress">
          <input
            className={inputClassName}
            id="streetAddress"
            name="streetAddress"
            type="text"
            autoComplete="street-address"
            maxLength={120}
            pattern=".*\S.*"
            title="Enter a street address."
            required
          />
        </Field>

        <div>
          <Field label="City" name="city">
            <input
              className={inputClassName}
              id="city"
              name="city"
              type="text"
              autoComplete="address-level2"
              maxLength={80}
              pattern=".*\S.*"
              title="Enter a city."
              value={city}
              onChange={handleCityChange}
              required
            />
          </Field>
          <div aria-live="polite" className="mt-2 min-h-5 text-sm">
            {weatherStatus === "loading" ? (
              <p className="text-slate-600">Loading current weather…</p>
            ) : null}
            {weatherStatus === "error" ? (
              <p className="text-red-700" role="alert">
                {weatherError}
              </p>
            ) : null}
            {weatherStatus === "success" && weather ? (
              <p className="text-slate-700">
                <span className="font-semibold">
                  {weather.city}: {Math.round(weather.temperature)}°C
                </span>
                {" — "}
                {weather.description}. Feels like{" "}
                {Math.round(weather.feelsLike)}°C, humidity {weather.humidity}%.
              </p>
            ) : null}
          </div>
        </div>

        <Field label="Province" name="province">
          <select
            className={inputClassName}
            id="province"
            name="province"
            defaultValue=""
            autoComplete="address-level1"
            required
          >
            <option value="" disabled>
              Select a province or territory
            </option>
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Postal Code" name="postalCode">
          <input
            className={inputClassName}
            id="postalCode"
            name="postalCode"
            type="text"
            autoComplete="postal-code"
            autoCapitalize="characters"
            maxLength={7}
            pattern="[ABCEGHJ-NPRSTVXYabceghj-nprstvxy][0-9][ABCEGHJ-NPRSTV-Zabceghj-nprstv-z][ ]?[0-9][ABCEGHJ-NPRSTV-Zabceghj-nprstv-z][0-9]"
            title="Enter a Canadian postal code, for example A1A 1A1."
            required
          />
        </Field>
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">* Required field</p>
        <button
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Saving student..." : "Register student"}
        </button>
      </div>

      {formState.error ? (
        <p
          aria-live="polite"
          className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {formState.error}
        </p>
      ) : null}
    </form>
  );
}
