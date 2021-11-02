type DebuggerMessage<State> = {
  readonly type: 'START' | 'ACTION' | 'DISPATCH'
  readonly payload:
    | {
        readonly type: 'JUMP_TO_STATE' | 'JUMP_TO_ACTION'
      }
    | {
        readonly type: 'IMPORT_STATE'
        readonly nextLiftedState: {
          readonly computedStates: ReadonlyArray<{
            readonly state: State
          }>
        }
      }
}

type DebuggerAction = {
  readonly type: string
  readonly [key: string]: unknown
}

type Connection<State, Action> = {
  readonly init: (state: State) => void
  readonly send: (action: Action, state: State) => void
  readonly subscribe: (listener: (message: DebuggerMessage<State>) => void) => () => void
}

type ConnectionOptions<Action> = {
  readonly name?: string
  readonly remote?: boolean
  readonly port?: number
  readonly hostname?: string
  readonly secure?: boolean
  readonly getActionType?: (action: Action) => DebuggerAction
}

export declare function connectViaExtension<State, Action>(
  options?: ConnectionOptions<Action>
): Connection<State, Action>

export declare function extractState<State>(message: DebuggerMessage<State>): State
