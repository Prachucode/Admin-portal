<script>
	import logo from '$lib/assets/logo.png';

	let email = "";
	let password = "";

    let {data, form} = $props()
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
	<div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
		<div class="flex justify-center mb-6">
			<img src={logo} alt="ML Club Admin logo" class="h-16 w-auto" />
		</div>

		<h1 class="text-3xl font-bold text-center mb-6">
			Admin Login
		</h1>

		<form method="POST" class="space-y-5">
			<div>
				<label class="block mb-2 font-medium">User Id</label>

				<input
					type="email"
					name="email"
					bind:value={email}
					required
					class="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="admin@example.com"
				/>
			</div>

			<div>
				<label class="block mb-2 font-medium">Password</label>

				<input
					type="password"
					name="password"
					bind:value={password}
					required
					class="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="••••••••"
				/>
			</div>

			<button
				type="submit"
				class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
			>
				Login
			</button>
        {#if form?.error}
            <div class="bg-red-100 text-red-700 p-3 rounded mb-4">
		        {form.error}
	        </div>
        {/if}
		
		</form>
	</div>
</div>