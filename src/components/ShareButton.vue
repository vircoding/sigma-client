<script setup>
  const props = defineProps(["url"]);

  const shareLink = () => {
    const shareData = {
      title: "Sigma Post",
      text: "Check this house",
      url: props.url,
    };

    navigator
      .share(shareData)
      .then(() => console.log("Successfully shared link"))
      .catch((error) => console.log("Share Failed", error));
  };
</script>

<template>
  <button @click.prevent="shareLink">
    <img src="../assets/share-icon.svg" />
  </button>
</template>
