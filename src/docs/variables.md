---
title: Resetup
icon: arrows-rotate
category:
  - Guide
pageInfo: false
breadcrumb: true
contributors: false
editLink: false
lastUpdated: false
backtotop: false
---

- ExcludeUsers

Default value: []
Purpose: Exclude users from being killed their connection thready by mysync during setting a host into [read_only](TODO) mode.
Reason: System users, at least mysync's user, may should not be killed during turning a host into [read_only](TODO)

- ShowOnlyGTIDDiff

::: warning Temporary variable
The variable is going to be deleted soon.
:::

Default value: false
Purpose: Show only every replica host difference between its GTID and the GTID of the master (what is about cascade replica TODO).
Reason: Every switchover on a new master rise cumulative size of GTID over the cluster. Mysync writes full GTID in the logs by default; hence this behaviour produces large and unclear to read logs.

- ForceSwitchover

::: warning Temporary variable
The variable is going to be deleted soon.
:::

Default value: false
Purpose: Turn [offline_mode](TODO) on MySQL master while making switchover.
Reason: When a lot of connection come in a period of switchover, mysync can't kill connection threads fast enough to enter read_only mode.

- ManagerElectionDelayAfterQuorumLoss

TODO
ManagerElectionDelayAfterQuorumLoss is a period after quorum loss when nodes continue working in normal mode and acquire manager's lock in dcs.

- ManagerLockAcquireDelayAfterQuorumLoss

TODO
ManagerLockAcquireDelayAfterQuorumLoss is a period after quorum loss when nodes wait for the old manager to start working again and can't acquire locks in dcs.
