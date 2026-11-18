---
title: Search the moment, return the scene
description: A short note on choosing what to search and what to return in a video retrieval system.
published: 2026-11-18
type: Note
tags: [Search, Multimodal, Milvus]
toc: true
---

Imagine looking for a cyclist crossing at a junction while the vehicle slows. A clip can contain all three clues even if they occur at different times. For data curation, the useful result is a clip you can review and a timestamp that tells you why it matched.

## Choose the unit of search

A scene-level representation is useful for broad context. Smaller windows give the system a chance to find short events that a clip summary might miss. The two levels answer different questions, so write down the unit that needs to match and the unit a reviewer expects to receive.

| Query need | Search unit | Return to the reviewer |
| --- | --- | --- |
| Find clips set at an intersection | Scene | Clip |
| Find a cyclist crossing while the vehicle slows | Time window with both conditions | Clip and matching time range |

## Keep conditions at the same granularity

If a semantic match applies to one window and the motion filter applies to another, accepting the clip can turn two partial matches into a misleading result. Evaluate the conditions at the window level when the question requires them to hold together, then group or rank the qualifying windows by their parent clip.

## References

- [Zilliz webinar on hierarchical multimodal search for data curation](https://zilliz.com/event/hierarchical-multimodal-search-autonomous-driving-webinar). The webinar covers scene- and object-level retrieval, window-level filtering, and preserving parent context with Milvus StructArray.
