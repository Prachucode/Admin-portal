<script>
    import logo from '$lib/assets/logo.png';
</script>
<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

		<div class="w-96 rounded-xl bg-white p-6 shadow-xl">
            <div class="flex justify-center mb-6">
			<img src={logo} alt="ML Club Admin logo" class="h-16 w-auto" />
		</div>
			<h2 class="mb-3 text-xl font-bold">
				Logout
			</h2>

			<p class="mb-6 text-gray-600">
				Are you sure you want to logout?
			</p>

			<div class="flex justify-end gap-3">
                <form method="POST" action="?/cancel">
				<button
					type="submit"
					class="rounded-lg border px-4 py-2 hover:bg-gray-100"
				>
					Cancel
				</form>
                <form method="POST" action="?/logout">
				<button
					type="submit"
					class="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
				>
					Logout
				</button>
                </form>
			</div>

		</div>

	</div>