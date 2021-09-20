<script lang="ts">
	import classes from '$lib';


	const styles = {
		header: 'text-2xl font-bold',
		codeBlock: 'text-xs sm:text-sm overflow-x-auto py-2',
		codeInline: 'bg-gray-200 px-1',
	}

	let show = false;

	function toggle() {
		show = !show;
	}
</script>

<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />

<div class="py-10 px-5 sm:px-10 max-w-prose mx-auto">
	<h1 class="text-2xl font-bold pb-5">svelte-transition-classes</h1>
	<div class="space-y-3">
		<div>
			<a
				class="underline font-medium"
				href="https://github.com/rmarscher/svelte-transition-classes"
				rel="external">svelte-transition-classes</a> is a custom
				<a href="https://svelte.dev/docs#transition_fn" class="underline" rel="external">Svelte transition</a>
				that adds a set of base CSS classes to the
				DOM node, applies another set of classes for the start of the transition and
				then at the first tick of the transition, swaps the starting classes with
				another set of destination classes. CSS transitions and animations can be triggered
				from the class updates.
		</div>
		<div>
			This Svelte transition was created to easily implement the transitions used in
			<a rel="external" href="https://tailwindcss.com/docs/transition-property">Tailwind CSS</a>.
			The
			<a href="https://tailwindui.com/components/application-ui/elements/dropdowns" rel="external"
				>TailwindUI dropdown example component</a
			>
			has the following comment with recommended classes to apply:
		</div>
		<div>
			<pre class="{styles.codeBlock}">{`<!--
  Dropdown menu, show/hide based on menu state.

  Entering: "transition ease-out duration-100"
    From: "transform opacity-0 scale-95"
    To: "transform opacity-100 scale-100"
  Leaving: "transition ease-in duration-75"
    From: "transform opacity-100 scale-100"
    To: "transform opacity-0 scale-95"
-->`}</pre>
		</div>
		<div>You can implement that easily with svelte-transition-classes:</div>

		<div class="relative inline-block text-left">
			<div>
				<button
					on:click|preventDefault="{toggle}"
					type="button"
					class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
					id="menu-button"
					aria-expanded={show}
					aria-haspopup="true"
				>
					Toggle
					<!-- Heroicon name: solid/chevron-down -->
					<svg
						class="-mr-1 ml-2 h-5 w-5"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							clip-rule="evenodd"></path>
					</svg>
				</button>
			</div>
			{#if show}
				<!--
					Dropdown menu, show/hide based on menu state.

					Entering: "transition ease-out duration-100"
						From: "transform opacity-0 scale-95"
						To: "transform opacity-100 scale-100"
					Leaving: "transition ease-in duration-75"
						From: "transform opacity-100 scale-100"
						To: "transform opacity-0 scale-95"
				-->
				<div
					in:classes="{{
						duration: 100,
						base: 'transition ease-out duration-100',
						from: 'transform opacity-0 scale-95',
						to: 'transform opacity-100 scale-100',
					}}"
					out:classes="{{
						duration: 75,
						base: 'transition ease-in duration-75',
						from: 'transform opacity-100 scale-100',
						to: 'transform opacity-0 scale-95',
					}}"
					class="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
					role="menu"
					aria-orientation="vertical"
					aria-labelledby="menu-button"
					tabindex="-1"
				>
					<div class="py-1" role="none">
						<!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
						<a
							href=""
							class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
							role="menuitem"
							tabindex="-1"
							id="menu-item-0">Item 1</a
						>
						<a
							href="#2"
							class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
							role="menuitem"
							tabindex="-1"
							id="menu-item-1">Item 2</a
						>
						<a
							href="#3"
							class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
							role="menuitem"
							tabindex="-1"
							id="menu-item-2">Item 3</a
						>
					</div>
				</div>
			{/if}
		</div>

		<div class="pt-6">
			Obviously there is more to do to implement a dropdown component with keyboard navigation, click handlers,
			aria attributes and other UX considerations, but the transition has been implemented exactly as suggested by
			Tailwind UI.
		</div>
		<div>
			The <span class={styles.codeInline}>base</span>, <span class={styles.codeInline}>from</span>
			and <span class={styles.codeInline}>to</span> params are strings containing the class names
			and are all optional. The <span class={styles.codeInline}>duration</span> is required to give
			time for the css transitions and animations to complete. The Svelte transition
			<span class={styles.codeInline}>delay</span> option is also supported.
		</div>

		<div class="pt-6">
			<!-- Had trouble with prettier and this code example, so encoded the script part -->
			<pre class="{styles.codeBlock}">{@html `&lt;script lang=&quot;ts&quot;&gt;
&#9;import classes from &apos;lively-transition-classes&apos;;
&#9;let show = false;
&lt;/script&gt;`}{`
{#if show}
  <div
    in:classes="{{
      duration: 100,
      base: 'transition ease-out duration-100',
      from: 'transform opacity-0 scale-95',
      to: 'transform opacity-100 scale-100',
    }}"
    out:classes="{{
      duration: 75,
      base: 'transition ease-in duration-75',
      from: 'transform opacity-100 scale-100',
      to: 'transform opacity-0 scale-95',
    }}"
  >
    Content here
  </div>
{/if}
`}</pre>
		</div>
	</div>
</div>
