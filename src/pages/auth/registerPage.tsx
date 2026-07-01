import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '@/lib/validation/auth';
import { useAuth } from '@/hooks/useAuth';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';

import {
  Eye,
  EyeOff,
  Loader2,
  UserPlus,
  Mail,
  Key,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Home,
} from 'lucide-react';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading, error, setError } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError(null);

    const result = await registerUser(data);

    if (result.success) {
      setSuccess(true);
      reset();

      setTimeout(() => navigate('/login'), 2000);
    }
  };

  // 👉 Google signup handler (backend will handle later)
  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <Card className="w-full max-w-md shadow-xl border-0 rounded-2xl">

        {/* HEADER */}
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-black text-white flex items-center justify-center rounded-xl font-bold">
            N
          </div>

          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-sm text-gray-500">
            Join NPGROUP and start managing your workspace
          </p>

          <Link to="/login" className="text-sm text-gray-500 hover:text-black flex items-center justify-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>
        </CardHeader>

        <CardContent className="space-y-4">

          {/* ALERTS */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                Account created successfully! Redirecting...
              </AlertDescription>
            </Alert>
          )}

          {/* GOOGLE BUTTON */}
          <Button
              type="button"
              variant="outline"
              className="w-full h-11 border-2 hover:border-restaurant-500 hover:bg-restaurant-50 transition-colors"
              onClick={handleGoogleSignup}
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

          {/* DIVIDER */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* NAME */}
            <div>
              <Label>Full Name</Label>
              <Input placeholder="John Doe" {...register('name')} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* EMAIL */}
            <div>
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input className="pl-10" placeholder="john@example.com" {...register('email')} />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* PASSWORD */}
            <div>
              <Label>Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-gray-500"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <Label>Confirm Password</Label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* TERMS */}
            <div className="flex items-center gap-2">
              <Checkbox {...register('agreeTerms')} />
              <span className="text-sm text-gray-600">
                I agree to Terms & Privacy Policy
              </span>
            </div>

            {/* SUBMIT */}
            <Button className="w-full h-11" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2" />
                  Create Account
                </>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-center text-sm text-gray-500">
          Already have an account?
          <Link to="/login" className="ml-1 text-black font-medium hover:underline">
            Sign in
          </Link>
        </CardFooter>

      </Card>
    </div>
  );
};