<script>
	import { page } from '$app/state';
	import logo from '$lib/assets/logo.png';
	import { afterNavigate } from '$app/navigation';
	import {
		LayoutDashboard,
		Users,
		FolderKanban,
		NotebookPen,
		LogOut,
		Menu, 
		X
	} from '@lucide/svelte';

	let { data, children } = $props();

	const menu = [
		{
			name: 'Dashboard',
			href: '/admin/dashboard',
			icon: LayoutDashboard
		},
		{
			name: 'Members',
			href: '/admin/members',
			icon: Users
		},
		{
			name: 'Projects',
			href: '/admin/projects',
			icon: FolderKanban
		},
		{
			name: 'Blogs',
			href: '/admin/blogs',
			icon: NotebookPen
		}
	];
	let sidebarOpen = $state(false);

	// afterNavigate(() => {
	// 	sidebarOpen = false;
	// })
</script>

<div class="flex h-screen bg-gray-100">

	<!-- Sidebar -->
	<aside
	class={`fixed md:static top-0 left-0 z-50 h-screen w-64 bg-slate-900 text-white flex flex-col transition-transform duration-300 ${
		sidebarOpen ? "translate-x-0" : "-translate-x-full"
	} md:translate-x-0`}
>

		<!-- Logo -->
		<div class="h-16 flex items-center justify-center gap-3 border-b border-slate-700 px-4">
			<img src={logo} alt="ML Club Admin logo" class="h-9 w-auto rounded-md object-contain" />
			<h1 class="text-lg font-semibold tracking-wide">
				ML Club Admin
			</h1>
		</div>
		<button
		type="button"
		class="md:hidden"
		aria-label="Close sidebar"
		onclick={() => (sidebarOpen = false)}
	>
		<X size={24} />
	</button>
		<!-- Navigation -->
		<nav class="flex-1 p-4 space-y-2">

			{#each menu as item}

				<a
					href={item.href}
					class={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
						page.url.pathname === item.href
							? 'bg-blue-600'
							: 'hover:bg-slate-800'
					}`}
				>

					<item.icon size={20} />

					<span>{item.name}</span>

				</a>

			{/each}

		</nav>

		<!-- Logout -->
		<div class="p-4 border-t border-slate-700">

			<a
				href="/auth/logout"
				class="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-red-600 transition"
			>

				<LogOut size={20} />

				<span>Logout</span>

			</a>

		</div>

	</aside>

	<!-- Main Content -->
	<div class="flex flex-col flex-1">

		<!-- Navbar -->
		<header class="h-16 bg-white shadow flex items-center justify-between px-4 md:px-8">

			<div class="flex items-center gap-4">

	<button
		class="md:hidden"
		onclick={() => (sidebarOpen = !sidebarOpen)}
	>
		<Menu size={28} />
	</button>

	<h2 class="text-xl md:text-2xl font-bold">
		ML Club Dashboard
	</h2>

</div>

			<div class="flex items-center gap-4">

				<div class="hidden sm:block text-right">

					<p class="font-semibold">
						{data.admin?.email}
					</p>

					<p class="text-sm text-gray-500">
						Administrator
					</p>

				</div>

				<div class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

					{data.admin?.email?.charAt(0).toUpperCase()}

				</div>

			</div>

		</header>

		<!-- Page Content -->
		<main class="flex-1 overflow-auto p-4 md:p-8">
			<div class="flex justify-center mb-8">
				<img src={logo} alt="ML Club Admin logo" class="h-28 w-auto rounded-lg bg-white p-3 shadow-lg" />
			</div>

			{@render children()}

		</main>

	</div>

</div>