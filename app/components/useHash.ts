import { useSyncExternalStore } from "react"

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange)
  return () => {
    window.removeEventListener("hashchange", onChange)
  }
}

/** Null during SSR/hydration, then the browser's hash. CSS handles navigation before hydration. */
export function useHash() {
  return useSyncExternalStore(
    subscribe,
    () => window.location.hash.slice(1),
    () => null,
  )
}

/** Drops the hash without scrolling or adding a history entry. */
export function clearHash() {
  window.history.replaceState(
    window.history.state,
    "",
    window.location.pathname + window.location.search,
  )
  window.dispatchEvent(new HashChangeEvent("hashchange"))
}
