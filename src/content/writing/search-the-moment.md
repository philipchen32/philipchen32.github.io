---
title: Search the moment, return the scene
description: How I used Milvus to return a driving clip and the exact window that matched the query.
published: 2026-11-18
type: Note
tags: [Search, Multimodal, Milvus]
---

Say you’re looking for footage of a cyclist crossing at an intersection while the vehicle slows. If the cyclist appears at the start and the vehicle brakes at the end, the clip contains both cues and still misses the event you asked for.

In my Milvus demo, the highlighted match was the 8–14 second window. The candidate result included the parent clip and that time range, so a reviewer could jump to the match and decide whether the clip belonged in the dataset.

## Choose the unit of search

A scene-level embedding can help find clips set at an intersection. For a query about something happening while the vehicle slows, I search shorter windows and apply the motion filter to the same window as the semantic match.

| Query | Search unit | Return |
| --- | --- | --- |
| Clips set at an intersection | Whole clip | Clip |
| A cyclist crossing while the vehicle slows | Window where both conditions hold | Clip and matching time range |

## Keep conditions at the same granularity

I used Milvus StructArray to keep each window’s embedding, timestamps, and motion metadata together under its parent clip. That gives the query a place to apply both conditions and gives the reviewer a timestamp to inspect. The same distinction comes up in document search when a passage justifies the match and the full document provides context.

## References

- [Zilliz webinar on hierarchical multimodal search for data curation](https://zilliz.com/event/hierarchical-multimodal-search-autonomous-driving-webinar)
