const verifyToken = async (token: string | null) => {
  try {
    if (!token) {
      return false;
    }

    const response = await fetch(
      `https://maicon-gabriel-alves.vercel.app/api/login`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.status !== 200) {
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
      }
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default verifyToken;
