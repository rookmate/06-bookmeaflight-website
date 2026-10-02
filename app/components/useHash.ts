import { useSyncExternalStore } from "react"

function subscribe(onChange: () => void) {
  // Next changes the URL with pushState, which fires no hashchange. The Navigation API reports it
  // where it exists. Next does so while React is committing, when updates are not allowed, so wait.
  const navigation = (window as { navigation?: EventTarget }).navigation
  const onNavigate = () => queueMicrotask(onChange)

  window.addEventListener("hashchange", onChange)
  navigation?.addEventListener("currententrychange", onNavigate)
  return () => {
    window.removeEventListener("hashchange", onChange)
    navigation?.removeEventListener("currententrychange", onNavigate)
  }
}

/** The id in the URL hash, "fashion" for #fashion. Empty on the server and when there is none. */
export function useHash() {
  return useSyncExternalStore(
    subscribe,
    () => window.location.hash.slice(1),
    () => "",
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
