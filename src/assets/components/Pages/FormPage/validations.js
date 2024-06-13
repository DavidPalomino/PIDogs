export const validateDogForm = (formData, minMax) => {
  let errors = {
    name: "",
    image: "",
    temperaments: "",
  };

  const regexText = /^[A-Za-z ]*$/;
  const regexImage = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)$/;

  if (!regexText.test(formData.name) || !formData.name.trim()) {
    errors.name = "Name can't contain numbers or be empty.";
  }

  if (!regexImage.test(formData.image) || !formData.image.trim()) {
    errors.image = "A valid image URL is required.";
  }

  if (formData.temperaments.length === 0) {
    errors.temperaments = "At least one temperament must be selected.";
  }

  if (minMax) {
    if (minMax.height.max <= minMax.height.min) {
      errors.height = "The maximum height cannot be less than or equal to the minimum height.";
    }else if(!minMax.height.min){
      errors.height = "The maximum height cannot be less than or equal to the minimum height.";
    }

    if (minMax.weight.max <= minMax.weight.min) {
      errors.weight = "The maximum weight cannot be less than or equal to the minimum weight.";
    }else if(!minMax.weight.min){
      errors.weight = "The maximum height cannot be less than or equal to the minimum height.";
    }

    if (minMax.lifeSpan.max <= minMax.lifeSpan.min) {
      errors.lifeSpan =
        "The maximum life span cannot be less than or equal to the minimum life span.";
    }else if(!minMax.lifeSpan.min){
      errors.lifeSpan = "The maximum height cannot be less than or equal to the minimum height.";
    }
    
    return errors;

  }
  return errors;
};
