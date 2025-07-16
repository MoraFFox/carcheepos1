/**
 * Utility functions for persisting liked car ids in localStorage.
 * Keeping this logic in one place avoids repetition and makes it easy
 * to evolve (e.g., migrate to IndexedDB or remote sync later).
 *
 * @format
 */
import React, { useEffect } from "react";


const STORAGE_KEY = "likedids";

/**
 * Safely parse a JSON string, returning a fallback on failure.
 * @param {string|null} json
 * @param {any} fallback
 * @returns {any}
 */
function safeParse(json, fallback) {
  try {
    return json ? JSON.parse(json) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Get the current list of liked ids.
 * @returns {string[]}
 */
export function getLikedids() {
  return safeParse(localStorage.getItem(STORAGE_KEY), []);
}

function saveLikedids(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

/**
 * Add a id to the liked list (idempotent).
 * @param {string} id
 */
export function addLikedid(id) {
  const list = getLikedids();
  if (!list.includes(id)) {
    list.push(id);
    saveLikedids(list);
  }
}

/**
 * Remove a id from the liked list.
 * @param {string} id
 */
export function removeLikedid(id) {
  const list = getLikedids().filter((v) => v !== id);
  saveLikedids(list);
  }

/**
 * Check if a id is currently liked.
 * @param {string} id
 * @returns {boolean}
 */
export function isidLiked(id) {
  return getLikedids().includes(id);
}
