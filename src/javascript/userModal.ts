const userModal: HTMLDialogElement = document.querySelector("#user-modal")!;
const userNameInput: HTMLInputElement = document.querySelector("#user-name")!;
const userImageUrl: HTMLInputElement = document.querySelector("#user-image-url")!;
const imageContainer = document.querySelector("#imageContainer")!;
const userSumbit: HTMLButtonElement = document.querySelector("#user-submit")!;

const userData = localStorage.getItem('@userData');

userImageUrl.addEventListener("input", () => {
    const imageUrl = userImageUrl.value;
    imageContainer.innerHTML = "";
  
    if (imageUrl) {
      const imageElement = document.createElement("img");
      imageElement.src = imageUrl;
      imageElement.classList.add("preview-image");
      imageContainer.appendChild(imageElement);
    }
  });

if (!userData) {
    userModal.showModal();
  }
  
  userSumbit.addEventListener("click", () => {
    const userInfos = [
      { name: userNameInput.value, urlImage: userImageUrl.value }
    ];
    
    if(!!userNameInput.value && !!userImageUrl.value) {
        localStorage.setItem('@userData', JSON.stringify(userInfos));
        userModal.close();
    }
  });