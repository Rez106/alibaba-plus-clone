<template>
  <div class="flex flex-col gap-4 mt-5 order-1">
    <div
      class="flex items-center justify-start gap-4 w-10/12 max-[360px]:flex-col max-[360px]:w-full"
    >
      <div class="relative">
        <v-btn
          variant="outlined"
          rounded
          prepend-icon="mdi-swap-vertical"
          append-icon="mdi-menu-down"
          flat
          @click="filterShown.filter = !filterShown.filter"
        >
          مرتب سازی
        </v-btn>
        <div
          v-if="filterShown.filter"
          class="absolute bottom-auto list-none rounded-md w-full border z-[99999] bg-white"
        >
          <li
            v-for="item in filterValues.filter"
            @click="
              () => {
                filterShown.filter = !filterShown.filter;
                emits('filterComments', {
                  action: 'filter',
                  value: item.value,
                });
              }
            "
            class="text-sm text-gray-700 px-4 py-2 hover:bg-slate-200 duration-200"
            :class="{ 'bg-slate-200': activeFilters.filter === item.value }"
          >
            {{ item.title }}
          </li>
        </div>
      </div>
      <div class="relative">
        <v-btn
          variant="outlined"
          rounded
          prepend-icon="mdi-web"
          append-icon="mdi-menu-down"
          flat
          @click="filterShown.language = !filterShown.language"
        >
          همه زبان‌ها
        </v-btn>
        <div
          v-if="filterShown.language"
          class="absolute bottom-auto list-none rounded-md w-full border z-[99999] bg-white"
        >
          <li
            v-for="item in filterValues.language"
            @click="
              () => {
                filterShown.language = !filterShown.language;
                emits('filterComments', {
                  action: 'language',
                  value: item.value,
                });
              }
            "
            class="text-sm text-gray-700 px-4 py-2 hover:bg-slate-200 duration-200"
            :class="{ 'bg-slate-200': activeFilters.language === item.value }"
          >
            {{ item.title }}
          </li>
        </div>
      </div>
    </div>
    <div
      v-if="reviews || reviews?.result?.items?.length > 0"
      class="max-sm:w-full max-sm:mx-auto flex flex-col gap-4"
    >
      <detail-comment
        v-for="review in reviews.result.items"
        :key="review.id"
        :id="review.id"
        :authorId="review.author.user_id"
        :name="
          review.author.first_name.trim() + ' ' + review.author.last_name.trim()
        "
        :date="review.publish_date"
        :rating="review.rating"
        :title="review.title"
        :text="review.content"
        :likeCount="review.like_count"
        :liked="review.liked"
      />
      <div v-if="reviews.result.totalCount > 10">
        <v-pagination
          :length="Math.floor(reviews.result.totalCount / 10)"
          rounded="circle"
        ></v-pagination>
      </div>
    </div>
  </div>
  <div
    v-if="!reviews || reviews?.result?.items?.length === 0"
    class="flex flex-col items-center gap-3 mb-10"
  >
    <v-img
      :src="
        mobile
          ? 'https://cdn.alibaba.ir/h2/mobile/assets/images/reviews-26289117.svg'
          : 'https://cdn.alibaba.ir/h2/desktop/assets/images/reviews-26289117.svg'
      "
      width="200"
      height="200"
      cover
      eager
    />
    <h1 class="font-bold">هنوز کسی تجربه‌اش را درباره اینجا ثبت نکرده!</h1>
    <p class="text-sm text-center">
      با اشتراک‌گذاری تجربه‌تان، اولین نفری باشید که به مسافران بعدی کمک می‌کند.
    </p>
  </div>
</template>

//per
//https://ws.alibaba.ir/api/v1/plus/user/reviews?page_size=10&page_no=1&promoted_only=false&having_gallery_only=false&poi_id=63a0398acc0705b8920e8701&language_id=639ed1ae1a1a1a4d3317b00b
//english
//https://ws.alibaba.ir/api/v1/plus/user/reviews?page_size=10&page_no=1&promoted_only=false&having_gallery_only=false&poi_id=63a0398acc0705b8920e8701&language_id=639ed1c5cc0705b8920e86e1
//istanbul
//https://ws.alibaba.ir/api/v1/plus/user/reviews?page_size=10&page_no=1&promoted_only=false&having_gallery_only=false&poi_id=63a0398acc0705b8920e8701&language_id=639ed1dacc0705b8920e86e2
//azerbaijan
//https://ws.alibaba.ir/api/v1/plus/user/reviews?page_size=10&page_no=1&promoted_only=false&having_gallery_only=false&poi_id=63a0398acc0705b8920e8701&language_id=639ed1f41a1a1a4d3317b00c
// mofid tarin
//https://ws.alibaba.ir/api/v1/plus/user/reviews?page_size=10&page_no=1&promoted_only=false&having_gallery_only=false&poi_id=63a0398acc0705b8920e8701&sorts=LikeDesc,RateDesc
//most points
//https://ws.alibaba.ir/api/v1/plus/user/reviews?page_size=10&page_no=1&promoted_only=false&having_gallery_only=false&poi_id=63a0398acc0705b8920e8701&sorts=RateDesc
//least point
//https://ws.alibaba.ir/api/v1/plus/user/reviews?page_size=10&page_no=1&promoted_only=false&having_gallery_only=false&poi_id=63a0398acc0705b8920e8701&sorts=RateAsc
//newer
//https://ws.alibaba.ir/api/v1/plus/user/reviews?page_size=10&page_no=1&promoted_only=false&having_gallery_only=false&poi_id=63a0398acc0705b8920e8701&sorts=DateDesc
//older
//https://ws.alibaba.ir/api/v1/plus/user/reviews?page_size=10&page_no=1&promoted_only=false&having_gallery_only=false&poi_id=63a0398acc0705b8920e8701&sorts=DateAsc

<script setup>
const { activeFilters, detailId } = defineProps({
  activeFilters: Object,
  detailId: String,
});

const { mobile } = useDisplay();

const CommentsURL = computed(() => {
  if (!activeFilters?.filter && !activeFilters?.language)
    return `https://ws.alibaba.ir/api/v1/plus/user/reviews?page_size=10&page_no=1&promoted_only=false&having_gallery_only=false&poi_id=${detailId}`;

  if (activeFilters?.language) {
    const lang = filterValues.language.find(
      (item) => item.value === activeFilters?.language
    );
    return lang.url;
  }

  if (activeFilters?.filter) {
    const filter = filterValues.filter.find(
      (item) => item.value === activeFilters?.filter
    );
    return filter.url;
  }
});

const filterShown = ref({
  filter: false,
  language: false,
});

const { data: reviews, reviewError } = await useFetch(CommentsURL);

const emits = defineEmits(["filterComments"]);

const filterValues = {
  filter: [
    {
      title: "مفیدترین",
      value: "LikeDesc,RateDesc",
      url: `https://ws.alibaba.ir/api/v1/plus/user/reviews?page_size=10&page_no=1&promoted_only=false&having_gallery_only=false&poi_id=${detailId}&sorts=LikeDesc,RateDesc`,
    },
    {
      title: "بیشترین امتیاز",
      value: "RateDesc",
      url: `https://ws.alibaba.ir/api/v1/plus/user/reviews?page_size=10&page_no=1&promoted_only=false&having_gallery_only=false&poi_id=${detailId}&sorts=RateDesc`,
    },
    {
      title: "کمترین امتیاز",
      value: "RateAsc",
      url: `https://ws.alibaba.ir/api/v1/plus/user/reviews?page_size=10&page_no=1&promoted_only=false&having_gallery_only=false&poi_id=${detailId}&sorts=RateAsc`,
    },
    {
      title: "جدیدترین",
      value: "DateDesc",
      url: `https://ws.alibaba.ir/api/v1/plus/user/reviews?page_size=10&page_no=1&promoted_only=false&having_gallery_only=false&poi_id=${detailId}&sorts=DateDesc`,
    },
    {
      title: "قدیمی‌ترین",
      value: "DateAsc",
      url: `https://ws.alibaba.ir/api/v1/plus/user/reviews?page_size=10&page_no=1&promoted_only=false&having_gallery_only=false&poi_id=${detailId}&sorts=DateAsc`,
    },
  ],
  language: [
    {
      title: "همه زبان‌ها",
      value: "",
      url: `https://ws.alibaba.ir/api/v1/plus/user/reviews?page_size=10&page_no=1&promoted_only=false&having_gallery_only=false&poi_id=${detailId}`,
    },
    {
      title: "فارسی",
      value: "639ed1ae1a1a1a4d3317b00b",
      url: `https://ws.alibaba.ir/api/v1/plus/user/reviews?page_size=10&page_no=1&promoted_only=false&having_gallery_only=false&poi_id=${detailId}&language_id=639ed1ae1a1a1a4d3317b00b`,
    },
    {
      title: "انگلیسی",
      value: "639ed1c5cc0705b8920e86e1",
      url: `https://ws.alibaba.ir/api/v1/plus/user/reviews?page_size=10&page_no=1&promoted_only=false&having_gallery_only=false&poi_id=${detailId}&language_id=639ed1c5cc0705b8920e86e1
`,
    },
    {
      title: "ترکی استانبولی",
      value: "639ed1dacc0705b8920e86e2",
      url: `https://ws.alibaba.ir/api/v1/plus/user/reviews?page_size=10&page_no=1&promoted_only=false&having_gallery_only=false&poi_id=${detailId}&language_id=639ed1dacc0705b8920e86e2
`,
    },
    {
      title: "ترکی آذربایجانی",
      value: "639ed1f41a1a1a4d3317b00c",
      url: `https://ws.alibaba.ir/api/v1/plus/user/reviews?page_size=10&page_no=1&promoted_only=false&having_gallery_only=false&poi_id=${detailId}&language_id=639ed1f41a1a1a4d3317b00c
`,
    },
  ],
};
</script>

<style lang="scss" scoped></style>
