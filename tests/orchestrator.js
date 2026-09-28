async function waitForAllServices() {
  await waitForWebServices();

  async function waitForWebServices() {}
}

export default {
  waitForAllServices,
};
