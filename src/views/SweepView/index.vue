<template>
  <div>
    <h2 p="4">mineSweeper</h2>
    <div
      v-for="(row, y) in state"
      flex="~"
      items="center"
      justify="center"
      :key="y"
    >
      <button
        v-for="block in row"
        :key="block.x"
        flex="~"
        items="center"
        justify="center"
        w="10"
        h="10"
        m="0.5"
        :class="getBlockClass(block)"
        border="1 gray-300/10"
        @contextmenu.prevent="onRightClick(block)"
        @click="onClick($event, block)"
      >
        <template v-if="block.flagged">
          <div>🚩</div>
        </template>
        <template v-else-if="block.revealed || dev">
          <div v-if="block.mine">💣</div>
          <div v-if="!block.mine">{{ block.adjacentMines }}</div>
        </template>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const WIDTH = 10;
const HEIGHT = 10;

interface BlockState {
  x: number;
  y: number;
  revealed: boolean;
  mine?: boolean;
  flagged?: boolean;
  adjacentMines: number;
}

const state = reactive(
  Array.from({ length: HEIGHT }, (_, y) =>
    Array.from(
      { length: WIDTH },
      (_, x): BlockState => ({ x, y, adjacentMines: 0, revealed: false })
    )
  )
);

function generateMines(initial: BlockState) {
  for (const row of state) {
    for (const block of row) {
      if (Math.abs(initial.x - block.x) <= 1) continue;
      if (Math.abs(initial.y - block.y) <= 1) continue;
      block.mine = Math.random() < 0.2;
    }
  }
  updateNumbers();
}

const directions = [
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
];

const numberColors = [
  'text-transparent',
  'text-blue-500',
  'text-green-500',
  'text-pink-500',
  'text-yellow-500',
  'text-orange-500',
  'text-red-500',
  'text-purple-500',
  'text-teal-500',
];

function updateNumbers() {
  state.forEach((row) => {
    row.forEach((block) => {
      if (block.mine) return;

      getSiblings(block).forEach((b) => {
        if (b.mine) block.adjacentMines += 1;
      });
    });
  });
}

function getSiblings(block: BlockState) {
  return directions
    .map(([dx, dy]) => {
      const x2 = block.x + dx;
      const y2 = block.y + dy;
      // 超出边界
      if (x2 < 0 || x2 >= WIDTH || y2 < 0 || y2 >= HEIGHT) {
        return undefined;
      }
      return state[y2][x2];
    })
    .filter(Boolean) as BlockState[];
}

function expendZero(block: BlockState) {
  if (block.adjacentMines) return;

  getSiblings(block).forEach((s) => {
    if (!s.revealed) {
      s.revealed = true;
      expendZero(s);
    }
  });
}

let mineGenerated = false;
// 作弊模式
let dev = false;

function onRightClick(block: BlockState) {
  if (block.revealed) return;
  block.flagged = !block.flagged;
}

function onClick(e: MouseEvent, block: BlockState) {
  console.log(e);
  if (!mineGenerated) {
    generateMines(block);
    mineGenerated = true;
  }
  block.revealed = true;

  expendZero(block);
}

function getBlockClass(block: BlockState) {
  if (block.flagged) return 'bg-gray-600/50';
  if (!block.revealed) return 'bg-gray-500/10 hover:bg-gray-600/50';
  return block.mine ? 'bg-red-300/30' : numberColors[block.adjacentMines];
}
updateNumbers();

function checkGameState() {
  const blocks = state.flat();

  if (blocks.every((block) => block.revealed || block.flagged)) {
    if (blocks.some((block) => block.flagged && block.mine)) {
      alert('you cheat!');
    } else {
      alert('you win!');
    }
  }
}
checkGameState();
</script>

<style scoped></style>
