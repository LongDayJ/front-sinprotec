type ValidateLoginInput = {
    email: string;
    password: string;
};

type ValidateLoginResult = {
    valid: boolean;
    errors: {
        email?: string;
        password?: string;
    };
};

export function validateLogin({ email, password }: ValidateLoginInput): ValidateLoginResult {
    const errors: ValidateLoginResult["errors"] = {};

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Informe um e-mail válido.";
    }

    if (!password || password.length < 6) {
        errors.password = "A senha deve ter pelo menos 6 caracteres.";
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors,
    };
}
