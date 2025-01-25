import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterMutation } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { NavLink } from "react-router-dom";
import { selectRegisterError, selectRegisterLoading } from './userSlice.ts';
import { register } from './userThunk.ts';
import ButtonLoading from '../../components/ButtonLoading/ButtonLoading.tsx';

const Register = () => {
  const [form, setForm] = useState<RegisterMutation>({
    username: "",
    password: "",
    phone: '',
    displayName:''
  });
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();
  const loading = useAppSelector(selectRegisterLoading);
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(register(form)).unwrap();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <>
      <section className="vh-100 mt-2">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black ">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-2">
                        Регистрация
                      </p>

                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={submitFormHandler}
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            {getFieldError("username") ? (
                              <div
                                className="alert alert-danger w-100 text-center p-1 mx-auto"
                                role="alert"
                              >
                                {getFieldError("username")}
                              </div>
                            ) : null}
                            <input
                              type="text"
                              id="username"
                              className={
                                getFieldError("username")
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              onChange={inputChangeHandler}
                              value={form.username}
                              name="username"
                            />
                            <label className="form-label" htmlFor={"username"}>
                              Ваше имя
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            {getFieldError("password") ? (
                              <div
                                className="alert alert-danger w-100 text-center p-1 mx-auto"
                                role="alert"
                              >
                                {getFieldError("password")}
                              </div>
                            ) : null}
                            <input
                              type="password"
                              id="password"
                              className={
                                getFieldError("password")
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              onChange={inputChangeHandler}
                              value={form.password}
                              name="password"
                            />
                            <label htmlFor={"password"} className="form-label">
                              Пароль
                            </label>
                          </div>
                        </div>


                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            {getFieldError("displayName") ? (
                              <div
                                className="alert alert-danger w-100 text-center p-1 mx-auto"
                                role="alert"
                              >
                                {getFieldError("displayName")}
                              </div>
                            ) : null}
                            <input
                              type="text"
                              id="displayName"
                              className={
                                getFieldError("displayName")
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              onChange={inputChangeHandler}
                              value={form.displayName}
                              name="displayName"
                            />
                            <label htmlFor={"displayName"} className="form-label">
                              Нейминг
                            </label>
                          </div>
                        </div>


                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            {getFieldError("phone") ? (
                              <div
                                className="alert alert-danger w-100 text-center p-1 mx-auto"
                                role="alert"
                              >
                                {getFieldError("phone")}
                              </div>
                            ) : null}
                            <input
                              type="text"
                              id="phone"
                              className={
                                getFieldError("phone")
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              onChange={inputChangeHandler}
                              value={form.phone}
                              name="phone"
                            />
                            <label htmlFor={"phone"} className="form-label">
                              Телефон
                            </label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <ButtonLoading
                            type="submit"
                            text={"Зарегистрироваться"}
                            isLoading={loading}
                            isDisabled={loading}
                          ></ButtonLoading>
                        </div>
                        <NavLink
                          to={"/login"}
                          className={"d-block text-center"}
                        >
                          У вас уже есть аккаунт? Войти
                        </NavLink>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/draw1.png"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
