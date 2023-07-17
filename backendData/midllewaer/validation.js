const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");


const createValidation = (req, res, next) => {
  try {
    const registrationSchema = Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'in'] } }).required(),
      password: passwordComplexity().required(),  //Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,16}$')).required()
      location: Joi.string().required(),
    })

    let { error } = registrationSchema.validate( req.body )
    if (error) {
      return res.status(400).send({ status: false, message: error.details[0].message })
    } else {
      next()
    }

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }

}


// Joi validation schema for user login
const loginValidation = (req, res, next) => {
  try {

    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: passwordComplexity().required()
    }).unknown(true);

    let { error } = loginSchema.validate(req.body, { abortEarly: false })
    if (error) {
      return res.status(400).send({ status: false, message: error.message })
    } else {
      next()
    }

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });

  }
}


const updateValidation = (req, res, next) => {
  try {

    const schema = Joi.object().keys({
      name: Joi.string(),
      location: Joi.string(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'in'] } }),
      password: passwordComplexity()

    })
    let { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
      return res.status(400).send({ status: false, message: error.details })
    } else {
      next()
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}





module.exports = { createValidation, loginValidation, updateValidation };