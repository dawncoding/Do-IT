async function signUp() {
  const signUpForm = document.forms["modal__form--sign-up"];
  const pwField = signUpForm.pwForSignUp;
  const pwConfirmField = signUpForm.pwConfirmForSignUp;

  // 비밀번호와 비밀번호 확인 필드의 값을 가져온다.
  const pw = pwField.value;
  const confirmPw = pwConfirmField.value;
  const userId = signUpForm.userIdForSignUp.value;
  const nickname = signUpForm.nickname.value;
  const link = signUpForm.link.value;

  if (!userId.trim()) {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        container: "custom-swal-container",
      },
    });

    Toast.fire({
      icon: "warning",
      title: "아이디를 입력하세요.",
    });

    return;
  }

  if (!nickname.trim()) {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        container: "custom-swal-container",
      },
    });

    Toast.fire({
      icon: "warning",
      title: "닉네임을 입력하세요.",
    });

    return;
  }

  if (!pw.trim()) {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        container: "custom-swal-container",
      },
    });

    Toast.fire({
      icon: "warning",
      title: "비밀번호를 입력하세요.",
    });
    return;
  }

  if (!link.trim()) {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        container: "custom-swal-container",
      },
    });

    Toast.fire({
      icon: "warning",
      title: "링크를 입력하세요.",
    });

    return;
  }

  // 각 입력 필드에 대한 제한
  // 아이디: 영어 소문자/대문자, 숫자, 기호만 허용
  const userIdRegex = /^[a-zA-Z0-9-_]+$/;
  // 닉네임: 한글, 영어 소문자/대문자, 숫자, 기호만 허용
  const nicknameRegex = /^[가-힣a-zA-Z0-9-_]+$/;
  // 링크: HTTP 주소 형태
  const linkRegex = /^https?:\/\/\S+$/;

  // 아이디 형식이 올바르지 않는 경우
  if (!userIdRegex.test(userId)) {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        container: "custom-swal-container",
      },
    });

    Toast.fire({
      icon: "warning",
      title: "아이디를 올바른 형식으로 입력해주세요.",
    });

    return;
  }
  // 닉네임 형식이 올바르지 않는 경우
  if (!nicknameRegex.test(nickname)) {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        container: "custom-swal-container",
      },
    });

    Toast.fire({
      icon: "warning",
      title: "닉네임을 올바른 형식으로 입력해주세요.",
    });

    return;
  }

  // 링크 형식이 올바르지 않는 경우
  if (!linkRegex.test(link)) {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        container: "custom-swal-container",
      },
    });

    Toast.fire({
      icon: "warning",
      title: "링크를 올바른 형식으로 입력해주세요.",
    });

    return;
  }

  // 비밀번호와 비밀번호 확인이 일치하는지 검사한다.
  if (pw !== confirmPw) {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        container: "custom-swal-container",
      },
    });

    Toast.fire({
      icon: "warning",
      title: "입력한 비밀번호가 서로 일치하지 않습니다.",
    });

    // 필드 초기화
    pwField.value = "";
    pwConfirmField.value = "";
    // 포커스를 다시 비밀번호 필드로 이동
    pwField.focus();
    return; // 일치하지 않으면 회원가입 처리 중단
  }

  try {
    const res = await axios({
      method: "POST",
      url: "/user/signUp",
      data: {
        userId,
        nickname,
        pw,
        link,
      },
    });
    if (res.data.result) {
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          container: "custom-swal-container",
        },
      });

      Toast.fire({
        icon: "success",
        title: "회원가입을 축하드립니다.",
      });

      // 회원가입 성공 시 입력 필드 비우기
      signUpForm.reset();
      // 로그인 모달 생성
      openSignInModal();
    } else {
      // 회원가입을 실패했을 경우,
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          container: "custom-swal-container",
        },
      });

      Toast.fire({
        icon: "error",
        title: `${res.data.message}`,
      });

      signUpForm.reset();
    }
  } catch (error) {
    console.log(error);
  }
}
