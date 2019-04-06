const error = errorMessage => ({
  status: false,
  message: errorMessage,
});

const success = data => ({
  status: true,
  data,
});

module.exports = {
  error,
  success,
};
