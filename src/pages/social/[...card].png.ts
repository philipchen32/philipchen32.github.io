import { readFile } from 'node:fs/promises';
import type { APIRoute, GetStaticPaths } from 'astro';
import satori from 'satori';
import sharp from 'sharp';
import { pageMeta } from '../../lib/page-meta';
import { getWriting } from '../../lib/writing';
import { site } from '../../site.mjs';

type Card = { title: string; description: string; label: string };

export const getStaticPaths: GetStaticPaths = async () => [
  ...Object.entries(pageMeta).map(([card, props]) => ({ params: { card }, props })),
  ...(await getWriting(false)).map(({ id, data }) => ({
    params: { card: `post/${id}` },
    props: { title: data.title, description: data.description, label: `${site.name} · ${data.type}` },
  })),
];

const fonts = Promise.all([
  readFile(new URL(import.meta.resolve('@fontsource/inter/files/inter-latin-700-normal.woff'))),
  readFile(new URL(import.meta.resolve('@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff'))),
]);

function shorten(value: string, limit: number) {
  if (value.length <= limit) return value;
  const end = value.lastIndexOf(' ', limit - 1);
  return value.slice(0, end > 0 ? end : limit - 1) + '…';
}

export const GET: APIRoute = async ({ props }) => {
  const { title, description, label } = props as Card;
  const [inter, mono] = await fonts;
  const svg = await satori({
    type: 'div',
    props: {
      style: {
        width: 1200, height: 630, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'flex-start', position: 'relative',
        fontFamily: 'Inter', color: '#ffffff',
        backgroundImage: 'radial-gradient(ellipse at bottom right, #1c2257, #000000 63%)',
      },
      children: [
        { type: 'div', props: { style: {
          position: 'absolute', display: 'flex', top: 26, left: 26, width: 1146, height: 576, border: '1px solid #25283a', borderRadius: 20,
        } } },
        { type: 'div', props: { style: {
          marginLeft: 84, width: 74, height: 5, borderRadius: 3, marginBottom: 28,
          backgroundImage: 'linear-gradient(135deg, #49BCFF 0%, #175FFF 30%, #7F47FF 65%, #C84CFF 100%)',
        } } },
        { type: 'div', props: { style: {
          marginLeft: 84, color: '#49bcff', fontFamily: 'IBM Plex Mono', fontSize: 22, letterSpacing: 3,
          textTransform: 'uppercase', marginBottom: 26,
        }, children: label } },
        { type: 'div', props: { style: {
          fontSize: title.length > 60 ? 60 : 78, fontWeight: 700, lineHeight: 1.08,
          marginLeft: 84, letterSpacing: -3.5, width: 1010,
        }, children: shorten(title, 110) } },
        { type: 'div', props: { style: {
          marginLeft: 84, color: '#a9b0c0', fontFamily: 'IBM Plex Mono', fontSize: 23, marginTop: 28,
          lineHeight: 1.45, width: 900,
        }, children: shorten(description, 170) } },
      ],
    },
  }, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Inter', data: inter, weight: 700 },
      { name: 'IBM Plex Mono', data: mono, weight: 400 },
    ],
  });
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
