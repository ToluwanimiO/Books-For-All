<template>
  <section
    aria-labelledby="hero-title"
    class="flex flex-col md:flex-row h-fit max-h-[90vh] w-fit mb-10! md:mb-0!"
  >
    <div>
      <p
        class="flex w-fit px-2 py-1 items-center text-green-primary font-bold rounded-2xl bg-gray-100"
      >
        <MaterialSymbolsFavorite class="mr-1" />Building a community of learners
      </p>
      <h1 id="hero-title" class="text-5xl! md:text-6xl! font-extrabold mt-3">
        Every Textbook Deserves
        <span class="text-green-700">Another Student</span>
      </h1>
      <p class="text-lg mt-4 mb-4">
        Donate books, and help schools build community-powered learning
        resources
      </p>
      <el-button type="primary" class="p-6! hidden! md:flex!"
        ><router-link class="flex gap-2 text-lg!" :to="{ name: 'donate' }"
          ><MaterialSymbolsFeaturedSeasonalAndGifts />Donate Books</router-link
        >
      </el-button>
      <ul class="flex p-0 gap-2 md:gap-8 mt-4">
        <li class="flex items-center">
          <BasilBookOpenSolid
            class="mr-2 text-green-600 text-3xl md:text-4xl"
          />
          <div>
            <div class="text-xl md:text-2xl font-bold">5000+</div>
            Books Donated
          </div>
        </li>
        <li class="flex items-center">
          <RiSchoolFill class="mr-2 text-blue-600 text-2xl md:text-4xl" />
          <div>
            <div class="text-xl md:text-2xl font-bold">50+</div>
            Participating Schools
          </div>
        </li>
        <li class="flex items-center">
          <PhUsersThreeFill class="mr-2 text-yellow-600 text-5xl" />
          <div>
            <div class="text-xl md:text-2xl font-bold">2000+</div>
            Students Impacted
          </div>
        </li>
      </ul>
    </div>
    <img
      class="md:w-[65%] h-fit"
      src="@/assets/images/landing-hero.png"
      alt="Hero Image"
    />
    <div class="text-right">
      <el-button
        type="primary"
        class="p-4 w-fit md:hidden! fixed right-3 bottom-10 z-50"
        ><router-link class="flex gap-2 text-lg!" :to="{ name: 'donate' }"
          ><MaterialSymbolsFeaturedSeasonalAndGifts />
          <!-- Donate Books -->
        </router-link>
      </el-button>
    </div>
  </section>
  <section class="flex flex-wrap md:flex-nowrap! gap-10">
    <article
      class="flex w-full bg-[#F7F8EE] md:w-1/2 rounded-lg md:py-0 py-4 px-5 items-center"
    >
      <div class="flex flex-col gap-4">
        <h6 class="text-green-800! text-sm! font-bold">FOR DONORS</h6>
        <p class="font-bold text-2xl">Give Your Books A Second Life</p>
        <p>
          Donate your used textbooks and help students who can't afford to buy
          new ones
        </p>
        <el-button type="primary" class="w-fit"
          ><router-link class="flex items-center gap-2" :to="{ name: 'donate' }"
            >Donate Now <MaterialSymbolsArrowRightAltRounded
          /></router-link>
        </el-button>
      </div>
      <img
        src="@/assets/images/donate-books.png"
        class="w-3/5 h-fit hidden md:block p-2"
        alt="Donate Books Image"
      />
    </article>
    <article
      class="bg-blue-50 flex w-full md:w-1/2 rounded-lg px-5 items-center md:py-0 py-4"
    >
      <div class="flex flex-col gap-4">
        <h6 class="text-blue-900! text-sm! font-bold">FOR SCHOOLS</h6>
        <p class="font-bold text-2xl">Become A Community Book Hub</p>
        <p>
          Register your school to receive donations and make books available to
          your students
        </p>
        <el-button type="plain" class="w-fit"
          ><router-link
            class="flex items-center gap-2 text-black"
            :to="{ name: 'donate' }"
            >Register Your School <MaterialSymbolsArrowRightAltRounded
          /></router-link>
        </el-button>
      </div>
      <a href="https://www.vecteezy.com/free-vector/learning" class="hidden"
        >Learning Vectors by Vecteezy</a
      >
      <img
        src="@/assets/images/school-building.png"
        class="w-3/5 hidden md:block p-5"
        alt="School Image"
      />
      <!-- <img src="@/assets/images/school.png" alt="School Image" /> -->
    </article>
  </section>
  <section>
    <h4 class="text-center mt-5 mb-4 text-2xl! font-bold">How It Works</h4>
    <ol
      class="flex flex-col md:flex-row justify-content-between gap-8 md:gap-4 [&_h6]:text-base! [&_h6]:font-bold [&_p]:text-gray-700!"
    >
      <li class="md:flex-1">
        <article class="flex gap-2">
          <div class="number">1</div>
          <img
            src="@/assets/images/school-building.png"
            class="w-24 h-24"
            alt="School building representing school verification"
          />
          <div>
            <h6>School Verification</h6>
            <p>
              Schools register and upon verification are listed on the platform
            </p>
          </div>
        </article>
      </li>
      <li class="md:flex-1">
        <article class="flex gap-2">
          <div class="number">2</div>
          <img
            src="@/assets/images/book-stack.jpg"
            class="w-24 h-24 rounded-full"
            alt="Books representing donation process"
          />
          <div>
            <h6>Donate Books</h6>
            <p>
              Individuals or organizations donate used textbooks and drop off at
              verified schools
            </p>
          </div>
        </article>
      </li>
      <li class="md:flex-1">
        <article class="flex gap-2">
          <div class="number">3</div>
          <img
            src="@/assets/images/computer.jpg"
            class="w-24 h-24"
            alt="Computer system representing inventory update process"
          />
          <div>
            <h6>Inventory Update</h6>
            <p>Schools catalog and list books on the platform</p>
          </div>
        </article>
      </li>
      <li class="md:flex-1">
        <article class="flex gap-2">
          <div class="number">4</div>
          <img
            src="@/assets/images/reading-book.jpg"
            class="w-24 h-24 rounded-full"
            alt="Student accessing books through borrowing system"
          />
          <div>
            <h6>Students Borrow</h6>
            <p>
              Students can access the books they need from their school's book
              hub.
            </p>
          </div>
        </article>
      </li>
    </ol>
  </section>
  <div class="flex flex-col md:flex-row gap-2 md:gap-5 mt-12 justify-between">
    <section>
      <div class="flex justify-between">
        <h4 class="text-2xl! font-bold mb-5!">Registered Schools</h4>
        <el-button type="plain" class="md:hidden!"
          ><router-link :to="{ name: 'donate' }">View all</router-link>
        </el-button>
      </div>
      <div
        class="flex flex-col md:flex-row gap-8 md:gap-4 justify-content-between"
      >
        <article
          class="p-5 pb-24 shadow-md rounded-xl border border-gray-100 flex-1 relative"
        >
          <span
            class="rounded-xl absolute top-4 right-4 bg-green-600 text-white px-1.5 py-1 text-xs"
            >Active</span
          >
          <h4 class="text-xl! font-bold">
            <span
              class="rounded-full bg-yellow-100 mb-2 flex items-center justify-center p-7 h-10 w-10"
              >G</span
            >
            Greenwood High School
          </h4>
          <p class="my-1">Joined since</p>
          <p><strong>500+</strong> Books Received</p>
          <el-button type="plain" class="p-4 absolute left-5 right-5 bottom-3"
            ><router-link
              class="flex items-center gap-2 text-black"
              :to="{ name: 'donate' }"
              >Donate to School <MaterialSymbolsArrowRightAltRounded
            /></router-link>
          </el-button>
        </article>
        <article
          class="p-5 pb-24 shadow-md rounded-xl border border-gray-100 flex-1 relative"
        >
          <span
            class="rounded-xl absolute top-4 right-4 bg-green-600 text-white px-1.5 py-1 text-xs"
            >Active</span
          >
          <h4 class="text-xl! font-bold">
            <span
              class="rounded-full bg-pink-100 mb-2 flex items-center justify-center p-7 h-10 w-10"
              >R</span
            >
            Riverside Academy
          </h4>
          <p class="my-1">Joined since</p>
          <p><strong>300+</strong> Books Received</p>
          <el-button type="plain" class="p-4 absolute left-5 right-5 bottom-3"
            ><router-link
              class="flex items-center gap-2 text-black"
              :to="{ name: 'donate' }"
              >Donate to School <MaterialSymbolsArrowRightAltRounded
            /></router-link>
          </el-button>
        </article>
        <article
          class="p-5 pb-24 shadow-md rounded-xl border border-gray-100 flex-1 relative"
        >
          <span
            class="rounded-xl absolute top-4 right-4 bg-green-600 text-white px-1.5 py-1 text-xs"
            >Active</span
          >
          <h4 class="text-xl! font-bold">
            <span
              class="rounded-full bg-purple-100 mb-2 flex items-center justify-center p-7 h-10 w-10"
              >H</span
            >
            Hilltop Secondary School
          </h4>
          <p class="my-1">Joined since</p>
          <p><strong>300+</strong> Books Received</p>
          <el-button type="plain" class="p-4 absolute left-5 right-5 bottom-3"
            ><router-link
              class="flex items-center gap-2 text-black"
              :to="{ name: 'donate' }"
              >Donate to School <MaterialSymbolsArrowRightAltRounded
            /></router-link>
          </el-button>
        </article>
        <article
          class="p-5 pb-24 shadow-md rounded-xl border border-gray-100 flex-1 relative"
        >
          <span
            class="rounded-xl absolute top-4 right-4 bg-green-600 text-white px-1.5 py-1 text-xs"
            >Active</span
          >
          <h4 class="text-xl! font-bold">
            <span
              class="rounded-full bg-teal-100 mb-2 flex items-center justify-center p-7 h-10 w-10"
              >G</span
            >
            Greenwood High School
          </h4>
          <p class="my-1">Joined since</p>
          <p><strong>500+</strong> Books Received</p>
          <el-button type="plain" class="p-4 absolute left-5 right-5 bottom-3"
            ><router-link
              class="flex items-center gap-2 text-black"
              :to="{ name: 'donate' }"
              >Donate to School <MaterialSymbolsArrowRightAltRounded
            /></router-link>
          </el-button>
        </article>
      </div>
      <div class="text-center">
        <el-button
          type="plain"
          class="hidden! md:inline! p-4 !text-green-600 mt-4"
          ><router-link class="flex items-center gap-2" :to="{ name: 'donate' }"
            >See All Schools <MaterialSymbolsArrowRightAltRounded
          /></router-link>
        </el-button>
      </div>
    </section>
    <section
      class="mt-2 md:mt-0 bg-green-900 md:w-[320px] text-white [&_p]:!text-white [&_strong]:text-lg [&_article]:flex [&_article]:items-cente p-10 rounded-2xl"
    >
      <h4 class="text-white! text-2xl! font-bold">Our Impact</h4>
      <p class="text-wrap">
        Together, we are creating opportunities through books.
      </p>
      <ul class="flex flex-col gap-5 mt-3">
        <li>
          <article>
            <GameIconsOpenBook class="text-4xl mr-1 text-green-300" />
            <p><strong class="text-xl!">5,000+ </strong><br />Books Shared</p>
          </article>
        </li>
        <li>
          <article>
            <IconParkSolidSchool class="text-4xl mr-1 text-blue-300" />
            <p><strong class="text-xl!">50+ </strong><br />Schools</p>
          </article>
        </li>
        <li>
          <article>
            <MaterialSymbolsFavorite class="text-4xl mr-1 text-red-400" />
            <p><strong class="text-xl!">100+ </strong><br />Generous Donors</p>
          </article>
        </li>
      </ul>
    </section>
  </div>
  <section
    class="md:flex justify-around align-items-center mt-2 md:mt-5 rounded-xl p-8 md:px-0 bg-emerald-950 [&_p]:!text-white text-white"
  >
    <div class="flex">
      <PhBooksFill class="text-5xl hidden md:block mr-1" />
      <!-- <img src="../assets/join-us.png" alt="Join Us Image" /> -->
      <div>
        <h2 class="text-xl! md:text-3xl! text-white!">
          Ready to make textbooks accessible for every student?
        </h2>
        <p class="hidden md:block">
          Your books can open doors to a brighter future
        </p>
      </div>
    </div>
    <div class="gap-3 mt-3 md:mt-0 flex items-center">
      <el-button type="primary" class="md:p-4"
        ><router-link :to="{ name: 'donate' }">Donate Books</router-link>
      </el-button>
      <el-button type="plain" class="md:p-4 ml-0"
        ><router-link :to="{ name: 'donate' }"
          >Register Your School</router-link
        >
      </el-button>
    </div>
  </section>
</template>

<script setup lang="ts">
import MaterialSymbolsFavorite from '~icons/material-symbols/favorite'
import MaterialSymbolsFeaturedSeasonalAndGifts from '~icons/material-symbols/featured-seasonal-and-gifts'
import BasilBookOpenSolid from '~icons/basil/book-open-solid'
import RiSchoolFill from '~icons/ri/school-fill'
import PhUsersThreeFill from '~icons/ph/users-three-fill'
import PhBooksFill from '~icons/ph/books-fill'
import GameIconsOpenBook from '~icons/game-icons/open-book'
import IconParkSolidSchool from '~icons/icon-park-solid/school'
import MaterialSymbolsArrowRightAltRounded from '~icons/material-symbols/arrow-right-alt-rounded'
</script>
<style lang="scss" scoped>
.btn-basic {
  border: 1px solid #d1d1d6;
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}
.number {
  border-radius: 50%;
  color: white;
  background-color: rgb(9, 95, 9);
  min-width: 30px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
}
</style>
