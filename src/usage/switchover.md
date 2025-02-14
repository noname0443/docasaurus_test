---
title: Switchover
icon: shuffle
category:
  - Guide
pageInfo: false
breadcrumb: true
contributors: false
editLink: false
lastUpdated: false
backtotop: false
---

Switchover is preferable way to change current master in MySQL cluster.

| Flag | Usage |
|---|---|
| `--from <HOST>` | switch the master from the host with the specific prefix and prevent hosts with the prefix from becoming a new master |
| `--to <HOST>` | switch master to a specific host |
| `--wait <DURATION>` | how long wait for switchover to complete, 0s to return immediately (default 5m0s) |

Using actual information from [DCS](TODO), do checks that operation can be successfully completed:
- [HA group](TODO) contains more than one host
- Master wasn't already switched to the host
- Host with specified prefix [is active](TODO)

mysync uses prefix match for the switchover command. It is enough to specify only prefix of the host to start switchover. Although there is a difference between `--from` and `--to` commands.
`--to` can be only executed to switch to one specified host. When the specified prefix corresponds to several hosts, it will return an error.
`--from` can be used for host group that should be abandoned by master host. If it so, mysync will apply algorithm based on priority and replica lags. It chooses the host with maximum priority which has lag that less the threshold [`priority_choice_max_lag`](TODO). If there aren't such hosts, it find group of hosts with lag less than [`priority_choice_max_lag`](TODO) and repeat algorithm on them.

TODO: It would be beneficial to say separately about each stage of the algorithm

## Phase 0: turbo mode

It could be turn on with the option ...(TODO). While the option is on, mysync will try to converge a replica with the smallest lag up to the "threshold option here" (TODO). It will be try to complete the action for "timeout option here" (TODO). If mysync can't to converge a replica within the mentioned period, switchover will be rejected.

## Phase 1: read only

Mysync turns all nodes into read only mode

If the option "force_switchover" (TODO) is on, mysync will turn the old master into offline mode to prevent requests disrupt entering read only mode. Mysync holds the old master in offline mode until it will be in read only mode.

During this phase, mysync kills all threads that doesn't belong to "exclude_users" (TODO)

## Phase 2: stop replication

Mysync stops "external replication" (TODO) and replication between all HA nodes

## Phase 3: find most up-to-date host

Mysync checks split-brain situation and when there aren't any, find the replica with the smallest replication lag.

## Phase 4: catch up replica

If the chosen replica has lag, mysync will try to converge its data to old master data. To catch up mysync temporary choose the most recent node as master and turn on replication on expected master.

The prosedure could take up to "SlaveCatchUpTimeout" (TODO) time.

## Phase 5: turn to the new master

Mysync turns online mode (TODO) on the new master and change replication sources on all replicas in HA group to the new master.

If the reason of switchover was broken old master, mysync will start recovery (TODO) and reset external replication.

## Phase 6: promote new master

Mysync stops replications on new master, resets replication channels, set it writable, and turn on external replication.

Reenable events??? (TODO)
