export default function({ store, redirect }) {
  // If the state of test is not finish
  if (!store.getters["test/checkTest"]) {
    return redirect("/test");
  }
}
