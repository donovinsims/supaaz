'use client';
import React from 'react';
import {
	Popover,
	PopoverBody,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
	PopoverFooter,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { User, Settings, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export function UserProfileDemo({ user }: { user: any }) {
    const supabase = createClient();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" className="h-10 w-10 rounded-full p-0">
					<Avatar className="h-8 w-8">
						<AvatarImage src={user?.user_metadata?.avatar_url || `https://avatar.vercel.sh/${user?.id}`} />
						<AvatarFallback>{user?.email?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
					</Avatar>
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-62'>
				<PopoverHeader>
					<div className="flex items-center space-x-3">
						<Avatar className="h-10 w-10">
							<AvatarImage src={user?.user_metadata?.avatar_url || `https://avatar.vercel.sh/${user?.id}`} />
							<AvatarFallback>{user?.email?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
						</Avatar>
						<div className="flex-1 min-w-0">
							<PopoverTitle className="truncate">{user?.user_metadata?.full_name || user?.email?.split('@')[0]}</PopoverTitle>
							<PopoverDescription className='text-xs truncate'>{user?.email}</PopoverDescription>
						</div>
					</div>
				</PopoverHeader>
				<PopoverBody className="space-y-1 px-2 py-1">
					<Button variant="ghost" className="w-full justify-start" size="sm" onClick={() => router.push('/profile')}>
						<User className="mr-2 h-4 w-4" />
						View Profile
					</Button>
					<Button variant="ghost" className="w-full justify-start" size="sm" onClick={() => router.push('/profile')}>
						<Settings className="mr-2 h-4 w-4" />
						Settings
					</Button>
				</PopoverBody>
				<PopoverFooter>
					<Button variant="outline" className="w-full bg-transparent text-red-500 hover:text-red-600 border-red-200 hover:border-red-300" size="sm" onClick={handleLogout}>
						<LogOut className="mr-2 h-4 w-4" />
						Sign Out
					</Button>
				</PopoverFooter>
			</PopoverContent>
		</Popover>
	);
}
