'use client';

import { Eye, MailIcon } from 'lucide-react';

import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';

import GoogleLogin from './google-login';

const LoginForm = () => {
	return (
		<div className="mt-4 w-full max-w-sm">
			<form onSubmit={() => {}} className="flex flex-col gap-6">
				<div className="*:not-first:mt-2">
					<Label>Email</Label>
					<div className="relative">
						<Input className="peer pe-9" placeholder="Email" type="email" />
						<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
							<MailIcon size={16} aria-hidden="true" />
						</div>
					</div>
				</div>
				<div className="*:not-first:mt-2">
					<Label>Senha</Label>
					<div className="relative">
						<Input className="peer pe-9" placeholder="Senha" type="password" />
						<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
							<Eye size={16} aria-hidden="true" />
						</div>
					</div>
				</div>

				<Button>Entrar</Button>

				<GoogleLogin />
			</form>
		</div>
	);
};

export default LoginForm;
