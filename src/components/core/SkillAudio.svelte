<script lang="ts">
	import { skillSound } from 'src/store/game/skill-sound';

	$: if ($skillSound) {
		playAudio($skillSound);
	} else {
		if (audioEle) audioEle.pause();
	}

	function playAudio(src: string, volume = 0.1) {
		audioEle.src = src;
		audioEle.volume = volume;
		audioEle.play();
	}

	let audioEle: HTMLAudioElement;
</script>

<audio bind:this={audioEle} />
